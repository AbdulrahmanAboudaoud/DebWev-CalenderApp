// Program.cs — full single-file minimal API with EF Core + SQLite

// Required namespaces
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Data.Sqlite;
using System.ComponentModel.DataAnnotations;


var builder = WebApplication.CreateBuilder(args);

// --- Database (SQLite from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- OpenAPI (Swagger in Dev, optional) ---
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// -------------------------------------------
// DB Connectivity Check Endpoints
// -------------------------------------------

// EF Core connectivity check
app.MapGet("/db-ping", async (AppDbContext db) =>
{
    var ok = await db.Database.CanConnectAsync();
    return Results.Ok(new { connected = ok });
});

// Raw SQLite connection test (returns sqlite version)
app.MapGet("/db-ping-raw", (IConfiguration cfg) =>
{
    var cs = cfg.GetConnectionString("DefaultConnection")!;
    try
    {
        using var conn = new SqliteConnection(cs);
        conn.Open();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = "select sqlite_version()";
        var ver = cmd.ExecuteScalar()?.ToString() ?? "unknown";
        return Results.Ok(new { connected = true, version = ver });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.ToString(), title: "Raw connect failed");
    }
});

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
        // Primary keys
        modelBuilder.Entity<Employee>().HasKey(e => e.UserId);
        modelBuilder.Entity<Event>().HasKey(e => e.EventId);
        modelBuilder.Entity<OfficeAttendance>().HasKey(a => a.AttendanceId);
        modelBuilder.Entity<Room>().HasKey(r => r.RoomId);
        modelBuilder.Entity<Group>().HasKey(g => g.GroupId);

        // Composite keys
        modelBuilder.Entity<EventParticipation>().HasKey(e => new { e.EventId, e.UserId });
        modelBuilder.Entity<GroupMembership>().HasKey(g => new { g.UserId, g.GroupId });
        modelBuilder.Entity<RoomBooking>().HasKey(r => new { r.RoomId, r.UserId, r.BookingDate });

        // Relationships
        modelBuilder.Entity<Event>()
            .HasOne(e => e.Creator)
            .WithMany(emp => emp.EventsCreated)
            .HasForeignKey(e => e.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EventParticipation>()
            .HasOne(ep => ep.Employee)
            .WithMany(e => e.EventParticipations)
            .HasForeignKey(ep => ep.UserId);

        modelBuilder.Entity<EventParticipation>()
            .HasOne(ep => ep.Event)
            .WithMany(e => e.Participants)
            .HasForeignKey(ep => ep.EventId);

        modelBuilder.Entity<OfficeAttendance>()
            .HasOne(o => o.Employee)
            .WithMany(e => e.OfficeAttendances)
            .HasForeignKey(o => o.UserId);

        modelBuilder.Entity<RoomBooking>()
            .HasOne(rb => rb.Employee)
            .WithMany(e => e.RoomBookings)
            .HasForeignKey(rb => rb.UserId);

        modelBuilder.Entity<RoomBooking>()
            .HasOne(rb => rb.Room)
            .WithMany(r => r.RoomBookings)
            .HasForeignKey(rb => rb.RoomId);

        modelBuilder.Entity<GroupMembership>()
            .HasOne(gm => gm.Employee)
            .WithMany(e => e.GroupMemberships)
            .HasForeignKey(gm => gm.UserId);

        modelBuilder.Entity<GroupMembership>()
            .HasOne(gm => gm.Group)
            .WithMany(g => g.GroupMemberships)
            .HasForeignKey(gm => gm.GroupId);
    }
}

// ------------------------------
// Entities
// ------------------------------

public class Employee
{
    [Key] // <--- EF primary key
    public int UserId { get; set; }

    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Role { get; set; } = default!;
    public string Department { get; set; } = default!;
    public string Password { get; set; } = default!;

    public ICollection<Event> EventsCreated { get; set; } = new List<Event>();
    public ICollection<EventParticipation> EventParticipations { get; set; } = new List<EventParticipation>();
    public ICollection<OfficeAttendance> OfficeAttendances { get; set; } = new List<OfficeAttendance>();
    public ICollection<RoomBooking> RoomBookings { get; set; } = new List<RoomBooking>();
    public ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();
}

public class Event
{
    [Key]
    public int EventId { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime EventDate { get; set; }
    public int CreatedBy { get; set; }

    public Employee Creator { get; set; } = default!;
    public ICollection<EventParticipation> Participants { get; set; } = new List<EventParticipation>();
}

public class EventParticipation
{
    public int EventId { get; set; }
    public int UserId { get; set; }
    public string Status { get; set; } = default!;

    public Event Event { get; set; } = default!;
    public Employee Employee { get; set; } = default!;
}

public class OfficeAttendance
{
    [Key]
    public int AttendanceId { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } = default!;

    public Employee Employee { get; set; } = default!;
}

public class Room
{
    [Key]
    public int RoomId { get; set; }
    public string RoomName { get; set; } = default!;
    public int Capacity { get; set; }
    public string Location { get; set; } = default!;

    public ICollection<RoomBooking> RoomBookings { get; set; } = new List<RoomBooking>();
}

public class RoomBooking
{
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime BookingDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public string Purpose { get; set; } = default!;

    public Employee Employee { get; set; } = default!;
    public Room Room { get; set; } = default!;
}

public class Group
{
    [Key]
    public int GroupId { get; set; }
    public string GroupName { get; set; } = default!;
    public string Description { get; set; } = default!;

    public ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();
}

public class GroupMembership
{
    public int UserId { get; set; }
    public int GroupId { get; set; }

    public Employee Employee { get; set; } = default!;
    public Group Group { get; set; } = default!;
}
