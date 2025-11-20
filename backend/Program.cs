using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services.EmployeeService;
using backend.Repository;


var builder = WebApplication.CreateBuilder(args);

// --- Database (SQLite from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Add Controllers ---
builder.Services.AddControllers();

// GUYS ADD YOUR SERVICES HERE!!
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

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

// This adds fake data on startup for testing purposes
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        if (!db.Employees.Any())
        {
            db.Employees.AddRange(
                new Employee
                {
                    Name = "Admin",
                    Email = "admin@company.com",
                    Role = "Admin",
                    Department = "IT",
                    Password = "admin123"
                },
                new Employee
                {
                    Name = "John Doe",
                    Email = "john.doe@company.com",
                    Role = "Employee",
                    Department = "Sales",
                    Password = "password123"
                },
                new Employee
                {
                    Name = "Jane Smith",
                    Email = "jane.smith@company.com",
                    Role = "Employee",
                    Department = "Marketing",
                    Password = "password123"
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
    public DbSet<EventParticipation> EventParticipations => Set<EventParticipation>();
    public DbSet<OfficeAttendance> OfficeAttendances => Set<OfficeAttendance>();
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<RoomBooking> RoomBookings => Set<RoomBooking>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<GroupMembership> GroupMemberships => Set<GroupMembership>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EventParticipation>().HasKey(e => new { e.EventId, e.UserId });
        modelBuilder.Entity<GroupMembership>().HasKey(g => new { g.UserId, g.GroupId });
        modelBuilder.Entity<RoomBooking>().HasKey(r => new { r.RoomId, r.UserId, r.BookingDate });
    }
}
