// Program.cs — full single-file minimal API with EF Core + SQLite

// Required namespaces

using Microsoft.EntityFrameworkCore;
using backend.Models;


var builder = WebApplication.CreateBuilder(args);

// --- Database (SQLite from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Here are the controllers
builder.Services.AddControllers();

// Swagger is added
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });
});

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


var app = builder.Build();

// This adds fake data on startup for testing purposes
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.Employees.Any())
    {
        db.Employees.AddRange(
            new Employee { 
                Name = "Admin", 
                Email = "admin@company.com", 
                Role = "Admin",
                Department = "IT",
                Password = "admin123"
            },
            new Employee { 
                Name = "John Doe", 
                Email = "john.doe@company.com", 
                Role = "Employee",
                Department = "Sales",
                Password = "password123"
            },
            new Employee { 
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

// App configuration
app.UseSwagger();
app.UseSwaggerUI();


// app.UseHttpsRedirection(); we don't want this for now
app.UseCors("ReactApp");
app.UseAuthorization();

// This maps the controllers to the endpoints! (magic!!!)
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
