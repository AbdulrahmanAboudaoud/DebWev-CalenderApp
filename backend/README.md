# Backend — DebWev Calendar App

This folder contains the ASP.NET Core Web API backend for the DebWev Calendar App. The project is configured to use Entity Framework Core with SQLite for quick local development.

## Contents

- `Program.cs` — application startup and service registrations
- `AppDbContext` & models — EF Core DbContext and entity classes
- `Repository/` — generic repository implementation
- `Services/` — business logic (e.g., `EmployeeService`)
- `Migrations/` — EF Core migrations

## Prerequisites

- .NET SDK that supports `net9.0` (verify with `dotnet --version`)
- `dotnet-ef` global tool (will be installed in quick start steps below)

## Quick Start (Run Locally)

These steps create a local SQLite database, apply migrations, and start the API on `http://localhost:5000`.

From the repository root, run these commands:

```bash
cd backend
dotnet restore
dotnet build
mkdir -p Data
export ConnectionStrings__DefaultConnection="Data Source=Data/app.db"
dotnet tool install --global dotnet-ef --version 9.*
dotnet ef database update
dotnet run --urls "http://localhost:5000"
```

Then open the Swagger UI at `http://localhost:5000/swagger` to explore the API.

## Configuration

The app reads the connection string from `ConnectionStrings:DefaultConnection`.

You can provide this via **environment variable** (recommended for local development):

```bash
export ConnectionStrings__DefaultConnection="Data Source=Data/app.db"
```

Or via **appsettings.json** (a sample is already included in this folder):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Data/app.db"
  }
}
```

**Note:** The environment variable with double underscore (`ConnectionStrings__DefaultConnection`) maps to the nested configuration key `ConnectionStrings:DefaultConnection` in ASP.NET Core.

## EF Core & Migrations

Migrations are committed in `backend/Migrations/`.

To apply migrations locally (creates `Data/app.db`):

```bash
cd backend
dotnet ef database update
```

To create a new migration after modifying entities:

```bash
cd backend
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

If `dotnet ef` is not found, install the tool:

```bash
dotnet tool install --global dotnet-ef --version 9.*
```

## DI Registration (Important)

The backend uses a generic repository pattern. The `IRepository<>` interface is registered in `Program.cs`:

```csharp
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
```

This registration is already in place. If you add services that depend on `IRepository<T>`, they will resolve correctly.

## Troubleshooting

**App crashes on startup with DB connection error:**
- Ensure `ConnectionStrings__DefaultConnection` is set or `backend/appsettings.json` exists and points to a writable path (e.g., `Data/app.db`).

**DI errors complaining about `IRepository<T>`:**
- Verify the repository registration line above is present in `Program.cs`.

**Migrations fail with provider errors:**
- Verify you have the correct EF Core provider installed (this project uses `Microsoft.EntityFrameworkCore.Sqlite` for local runs).

**Build errors:**
- Run `dotnet clean` then `dotnet build`.

## Local Development Notes

- **CORS:** Configured to allow the frontend dev server at `http://localhost:3000`.
- **Swagger UI:** Enabled at `/swagger`.
- **Seed data:** Example `Employee` records are inserted on first run. Seed passwords are plaintext for local testing only — remove or change before any public deployment.

## Optional: Run with PostgreSQL

If you prefer PostgreSQL for development:

1. Change the DbContext configuration in `Program.cs` from `UseSqlite(...)` to `UseNpgsql(...)`
2. Provide a Postgres connection string via `ConnectionStrings:DefaultConnection`
3. Ensure you have the `Npgsql.EntityFrameworkCore.PostgreSQL` package (already in dependencies)

Example connection string:

```
Server=localhost;Port=5432;Database=calendar_app;User Id=postgres;Password=your_password;
```
