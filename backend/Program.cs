// Program.cs — full single-file minimal API with EF Core + SQLite

// Required namespaces
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Data.Sqlite;
using System.ComponentModel.DataAnnotations;
using backend.Models;
using Microsoft.AspNetCore.Hosting;


var builder = WebApplication.CreateBuilder(args);

// --- Database (SQLite from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Add Controllers ---
builder.Services.AddControllers();

// --- OpenAPI (Swagger in Dev, optional) ---
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// --- Map Controllers ---
app.MapControllers();

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
        modelBuilder.Entity<EventParticipation>().HasKey(e => new { e.EventId, e.UserId });
        modelBuilder.Entity<GroupMembership>().HasKey(g => new { g.UserId, g.GroupId });
        modelBuilder.Entity<RoomBooking>().HasKey(r => new { r.RoomId, r.UserId, r.BookingDate });
    }
}
