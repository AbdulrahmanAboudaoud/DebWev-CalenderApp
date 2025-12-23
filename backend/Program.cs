using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using backend.Models;
using backend.Services.EmployeeService;
using backend.Services.AttendanceService;
using backend.Services.EventService;
using backend.Services.VoteEventService;
using backend.Services.RoomService;
using backend.Repository;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using backend.Services.AuthService;
using BCrypt.Net;
using backend.Services.RoomBookingService;
// using FluentValidation;
// using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Adds validation!!
// When adding a new model / validation, please add it here too!
// builder.Services.AddValidatorsFromAssemblyContaining<RoomBooking>();
// builder.Services.AddValidatorsFromAssemblyContaining<Room>();
// builder.Services.AddValidatorsFromAssemblyContaining<Employee>();
// builder.Services.AddValidatorsFromAssemblyContaining<Event>();
// builder.Services.AddValidatorsFromAssemblyContaining<VoteEvent>();
// builder.Services.AddValidatorsFromAssemblyContaining<OfficeAttendance>();
// builder.Services.AddFluentValidationAutoValidation();
// builder.Services.AddFluentValidationClientsideAdapters();

// --- Database (SQLite from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Add Controllers ---
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// GUYS ADD YOUR SERVICES HERE!!
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IVoteEventService, VoteEventService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IRoomBookingService, RoomBookingService>();

// Register generic repository for DI (used by services/repositories)
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Allows the browser to connect frontend to backend, it's called CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// --- JWT Authentication ---
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Swagger - MUST be here, before builder.Build()
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Ensure Data directory exists
var dataDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Data");
if (!Directory.Exists(dataDirectory))
{
    Directory.CreateDirectory(dataDirectory);
}

// --- THIS LINE SEPARATES SERVICE REGISTRATION FROM APP BUILDING ---
var app = builder.Build();
// --- EVERYTHING AFTER THIS LINE IS MIDDLEWARE CONFIGURATION ---

// This adds fake data on startup for testing purposes + migrates old passwords to bcrypt
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Gotta create that db am I right fellas
        db.Database.EnsureCreated(); 

        // ONE-TIME: hash existing plain-text passwords (keeps your old DB)
        var employees = db.Employees.ToList();
        var changed = 0;

        foreach (var emp in employees)
        {
            // BCrypt hashes normally start with $2a$ / $2b$ / $2y$
            if (!string.IsNullOrWhiteSpace(emp.Password) && !emp.Password.StartsWith("$2"))
            {
                emp.Password = BCrypt.Net.BCrypt.HashPassword(emp.Password);
                changed++;
            }
        }

        if (changed > 0)
        {
            db.SaveChanges();
            Console.WriteLine($"Password migration: hashed {changed} employee password(s).");
        }
        else
        {
            Console.WriteLine("Password migration: nothing to migrate.");
        }

        // Seed employees (only if empty)
        if (!db.Employees.Any())
        {
            db.Employees.AddRange(
                new Employee
                {
                    Name = "Admin",
                    Email = "admin@company.com",
                    Role = "Admin",
                    Department = "IT",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123")
                },
                new Employee
                {
                    Name = "John Doe",
                    Email = "john.doe@company.com",
                    Role = "Employee",
                    Department = "Sales",
                    Password = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new Employee
                {
                    Name = "Jane Smith",
                    Email = "jane.smith@company.com",
                    Role = "Employee",
                    Department = "Marketing",
                    Password = BCrypt.Net.BCrypt.HashPassword("password123")
                }
            );
            db.SaveChanges();
        }



        // Seed Rooms (only if empty)
        if (!db.Rooms.Any())
        {
            db.Rooms.AddRange(
                new Room
                {
                    RoomName = "The Dungeon",
                    Capacity = 99,
                    Location = "Underground Basement"
                },
                new Room
                {
                    RoomName = "Heaven",
                    Capacity = 1,
                    Location = "Upstairs"
                },
                new Room
                {
                    RoomName = "Quiet Room",
                    Capacity = 5,
                    Location = "In the Lab!"
                }
            );
            db.SaveChanges();
        }

        if (!db.RoomBookings.Any())
        {
            db.RoomBookings.AddRange(
                new RoomBooking
                {
                    RoomId = 1,
                    UserId = 2,
                    StartTime = TimeOnly.FromDateTime(DateTime.Now.AddHours(1)),
                    EndTime = TimeOnly.FromDateTime(DateTime.Now.AddHours(2)),
                    Purpose = "Team Meeting"
                },
                new RoomBooking
                {
                    RoomId = 2,
                    UserId = 3,
                    StartTime = TimeOnly.FromDateTime(DateTime.Now.AddHours(4)),
                    EndTime = TimeOnly.FromDateTime(DateTime.Now.AddHours(5)),
                    Purpose = "Client Presentation"
                }
            );
            db.SaveChanges();
        }

        // Seed Events & VoteEvents (only if empty)
        if (!db.Events.Any())
        {
            db.Events.AddRange(
                new Event
                {
                    Title = "Mandatory Fun Committee Meeting",
                    Location = "The Fun Dungeon (basement)",
                    Description = "Attendance is mandatory. Fun is optional. Bring your own enthusiasm.",
                    StartTime = new DateTime(2026, 3, 3, 14, 0, 0),
                    EndTime = new DateTime(2026, 3, 3, 15, 0, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Office Chair Racing Championship",
                    Location = "Main Hallway",
                    Description = "Speed, skill, and questionable HR compliance. BYOC (Bring Your Own Chair). Helmets recommended but not required.",
                    StartTime = new DateTime(2026, 3, 7, 16, 30, 0),
                    EndTime = new DateTime(2026, 3, 7, 18, 0, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Passive Aggressive Email Writing Workshop",
                    Location = "Conference Room B",
                    Description = "Per my last email... Learn to craft the perfect 'just following up' message. As previously discussed.",
                    StartTime = new DateTime(2026, 3, 12, 10, 0, 0),
                    EndTime = new DateTime(2026, 3, 12, 11, 30, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Pretending to Work While Actually Napping Seminar",
                    Location = "Your Desk",
                    Description = "Master the art of strategic micro-napping. Learn advanced techniques like the 'Deep Thought Pose' and 'Email Contemplation'.",
                    StartTime = new DateTime(2026, 3, 15, 13, 0, 0),
                    EndTime = new DateTime(2026, 3, 15, 14, 0, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Annual 'Reply All' Apology Session",
                    Location = "Auditorium",
                    Description = "A safe space for those who accidentally replied all. Tissues provided. Judgment guaranteed.",
                    StartTime = new DateTime(2026, 3, 20, 11, 0, 0),
                    EndTime = new DateTime(2026, 3, 20, 12, 0, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Competitive Coffee Brewing Battle Royale",
                    Location = "Break Room",
                    Description = "Last person standing gets the good coffee beans. May the strongest brew win. BYOM (Bring Your Own Mug).",
                    StartTime = new DateTime(2026, 3, 25, 9, 0, 0),
                    EndTime = new DateTime(2026, 3, 25, 10, 30, 0),
                    CreatedBy = 1
                },
                new Event
                {
                    Title = "Extreme Spreadsheet Makeover",
                    Location = "IT Department",
                    Description = "Transform boring spreadsheets into slightly less boring spreadsheets. Comic Sans will NOT be tolerated.",
                    StartTime = new DateTime(2026, 3, 28, 15, 0, 0),
                    EndTime = new DateTime(2026, 3, 28, 16, 30, 0),
                    CreatedBy = 1
                }
            );
            db.SaveChanges();
        }

        if (!db.VoteEvents.Any())
        {
            db.VoteEvents.AddRange(
                new VoteEvent
                {
                    Title = "Office Karaoke Night",
                    Location = "Break Room",
                    Description = "Show off your vocal talents (or lack thereof). Tone-deaf singers welcome! Free earplugs provided.",
                    StartTime = new DateTime(2026, 4, 5, 18, 0, 0),
                    EndTime = new DateTime(2026, 4, 5, 21, 0, 0),
                    CreatedBy = 1,
                    Votes = 23
                },
                new VoteEvent
                {
                    Title = "Bring Your Pet to Work Day",
                    Location = "Office",
                    Description = "Dogs, cats, fish, hamsters... even your emotional support rock is welcome. Chaos guaranteed!",
                    StartTime = new DateTime(2026, 4, 10, 9, 0, 0),
                    EndTime = new DateTime(2026, 4, 10, 17, 0, 0),
                    CreatedBy = 1,
                    Votes = 87
                },
                new VoteEvent
                {
                    Title = "Paint & Sip (Budget Wine Edition)",
                    Location = "Conference Room A",
                    Description = "Create masterpieces while sipping questionable wine. No artistic talent required, but low standards help.",
                    StartTime = new DateTime(2026, 4, 15, 19, 0, 0),
                    EndTime = new DateTime(2026, 4, 15, 21, 30, 0),
                    CreatedBy = 1,
                    Votes = 42
                },
                new VoteEvent
                {
                    Title = "Desk Decoration Competition",
                    Location = "Your Workspace",
                    Description = "Transform your cubicle into a shrine of personality. Prize for most extra goes to whoever brings a disco ball.",
                    StartTime = new DateTime(2026, 4, 20, 10, 0, 0),
                    EndTime = new DateTime(2026, 4, 20, 16, 0, 0),
                    CreatedBy = 1,
                    Votes = 31
                },
                new VoteEvent
                {
                    Title = "Pizza vs Tacos Debate Tournament",
                    Location = "Cafeteria",
                    Description = "The age-old question finally gets answered. Team Pizza vs Team Tacos. Winner gets free lunch for a week.",
                    StartTime = new DateTime(2026, 4, 22, 12, 0, 0),
                    EndTime = new DateTime(2026, 4, 22, 13, 30, 0),
                    CreatedBy = 1,
                    Votes = 156
                },
                new VoteEvent
                {
                    Title = "Retro Game Tournament",
                    Location = "Game Room",
                    Description = "Dust off those Mario Kart skills. Winner crowned Office Gaming Champion. Trash talk encouraged.",
                    StartTime = new DateTime(2026, 4, 25, 17, 0, 0),
                    EndTime = new DateTime(2026, 4, 25, 20, 0, 0),
                    CreatedBy = 1,
                    Votes = 68
                },
                new VoteEvent
                {
                    Title = "Lunch Roulette Mystery Meal",
                    Location = "Mystery Location",
                    Description = "Spin the wheel, take your chances. Could be sushi, could be gas station sandwiches. Adventure awaits!",
                    StartTime = new DateTime(2026, 4, 28, 12, 0, 0),
                    EndTime = new DateTime(2026, 4, 28, 13, 0, 0),
                    CreatedBy = 1,
                    Votes = 15
                }
            );
            db.SaveChanges();
        }
    }
}
catch (Exception e)
{
    Console.WriteLine($"Error during: {e.Message}");
}

// App configuration
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("ReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

// ------------------------------
// EF Core DbContext & Entities
// ------------------------------
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<VoteEvent> VoteEvents => Set<VoteEvent>();
    public DbSet<EventParticipation> EventParticipations => Set<EventParticipation>();
    public DbSet<OfficeAttendance> OfficeAttendances => Set<OfficeAttendance>();
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<RoomBooking> RoomBookings => Set<RoomBooking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EventParticipation>().HasKey(e => new { e.EventId, e.UserId });
        modelBuilder.Entity<GroupMembership>().HasKey(g => new { g.UserId, g.GroupId });

        // one attendance per user per date
        modelBuilder.Entity<OfficeAttendance>().HasIndex(a => new { a.UserId, a.Date }).IsUnique();
    }
}
