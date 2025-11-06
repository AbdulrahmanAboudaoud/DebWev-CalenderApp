// Required namespaces
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;  // For raw DB connection

var builder = WebApplication.CreateBuilder(args);

// --- Database (Supabase Postgres via pooler/direct from appsettings.json) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Optional: helps when using DateOnly/TimeOnly with Npgsql
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// --- OpenAPI (keep if you want Swagger in Dev) ---
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

// Basic EF Core connectivity check
app.MapGet("/db-ping", async (AppDbContext db) =>
{
    var ok = await db.Database.CanConnectAsync();
    return Results.Ok(new { connected = ok });
});

// Raw Npgsql connection test (returns Postgres version)
app.MapGet("/db-ping-raw", async (IConfiguration cfg) =>
{
    var cs = cfg.GetConnectionString("DefaultConnection")!;
    try
    {
        await using var conn = new NpgsqlConnection(cs);
        await conn.OpenAsync();
        await using var cmd = new NpgsqlCommand("select version()", conn);
        var result = await cmd.ExecuteScalarAsync();
        var ver = result?.ToString() ?? "Unknown version";
        return Results.Ok(new { connected = true, version = ver });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.ToString(), title: "Raw connect failed");
    }
});

app.Run();

// --- DbContext: put this in /Data/AppDbContext.cs in your project ---
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Add your DbSets here, e.g.:
    // public DbSet<CalendarEvent> CalendarEvents => Set<CalendarEvent>();
}
