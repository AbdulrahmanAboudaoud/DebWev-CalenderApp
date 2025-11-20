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
- `dotnet-ef` global tool

## Quick Start (Run Locally)

These steps create a local SQLite database, apply migrations, and start the API on `http://localhost:5000`.

### All Platforms - Common Steps:
```bash
cd backend
dotnet restore
dotnet build
mkdir -p Data
```

### Platform-Specific Setup:

#### 🪟 Windows (Command Prompt/PowerShell)
```cmd
REM Set connection string
set ConnectionStrings__DefaultConnection="Data Source=Data/app.db"

REM Install EF Core tools
dotnet tool install --global dotnet-ef --version 9.*

REM Add to PATH (permanent - run in Administrator Command Prompt)
setx PATH "%PATH%;%USERPROFILE%\.dotnet\tools"

REM Or temporary (run each session)
set PATH=%PATH%;%USERPROFILE%\.dotnet\tools

REM Continue with migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run --urls "http://localhost:5000"
```

#### 🐧 Linux (Bash)
```bash
# Set connection string
export ConnectionStrings__DefaultConnection="Data Source=Data/app.db"

# Install EF Core tools
dotnet tool install --global dotnet-ef --version 9.*

# Add to PATH permanently
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc

# Continue with migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run --urls "http://localhost:5000"
```

####  macOS (Zsh - Default shell)
```bash
# Set connection string
export ConnectionStrings__DefaultConnection="Data Source=Data/app.db"

# Install EF Core tools
dotnet tool install --global dotnet-ef --version 9.*

# Add to PATH permanently
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zshrc
source ~/.zshrc

# Continue with migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run --urls "http://localhost:5000"
```

#### 🐚 macOS/Linux (Fish Shell)
```bash
# Set connection string
set -x ConnectionStrings__DefaultConnection "Data Source=Data/app.db"

# Install EF Core tools
dotnet tool install --global dotnet-ef --version 9.*

# Add to PATH permanently
set -U fish_user_paths $HOME/.dotnet/tools $fish_user_paths

# Continue with migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run --urls "http://localhost:5000"
```

Then open the Swagger UI at `http://localhost:5000/swagger` to explore the API.

## Current Application Structure

### Program.cs Features:
- **Automatic Data Directory Creation**: Creates `Data/` directory if it doesn't exist
- **SQLite Database**: Configured via `appsettings.json`
- **CORS Enabled**: For React frontend on `http://localhost:3000`
- **Swagger/OpenAPI**: Automatic API documentation
- **Seed Data**: Auto-populates with sample employees on first run
- **Error Handling**: Try-catch around database operations

### Database Entities:
- `Employee` - User accounts with roles
- `Event` - Calendar events
- `EventParticipation` - Many-to-many relationship for event attendees
- `OfficeAttendance` - Office presence tracking
- `Room` & `RoomBooking` - Room reservation system
- `Group` & `GroupMembership` - Team/group management

### Current Services:
- `EmployeeService` - Business logic for employee operations
- `IRepository<T>` - Generic repository pattern for data access

## Configuration

### appsettings.json (Current):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Data/app.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### Environment Variable (Alternative):
**Windows:**
```cmd
set ConnectionStrings__DefaultConnection="Data Source=Data/app.db"
```

**Linux/macOS:**
```bash
export ConnectionStrings__DefaultConnection="Data Source=Data/app.db"
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

## PATH Setup Troubleshooting by Platform

### 🪟 Windows Issues:
**If `dotnet-ef` not found after installation:**
```cmd
# Check if tools are installed
dir %USERPROFILE%\.dotnet\tools

# Temporary fix (run each session)
set PATH=%PATH%;%USERPROFILE%\.dotnet\tools

# Permanent fix (Administrator Command Prompt)
setx PATH "%PATH%;%USERPROFILE%\.dotnet\tools" /M

# Restart Command Prompt after permanent change
```

### 🐧 Linux Issues:
**If `dotnet-ef` not found:**
```bash
# Check installation
ls ~/.dotnet/tools/

# Manual PATH set
export PATH="$PATH:$HOME/.dotnet/tools"

# Verify shell and add to correct file
echo $SHELL
# If /bin/bash -> add to ~/.bashrc
# If /bin/zsh -> add to ~/.zshrc
```

###  macOS Issues:
**If `dotnet-ef` not found:**
```bash
# Check installation
ls ~/.dotnet/tools/

# For default macOS (Zsh)
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zshrc
source ~/.zshrc

# If using Bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bash_profile
source ~/.bash_profile
```

### 🐚 Fish Shell Issues:
**If `dotnet-ef` not found:**
```fish
# Check installation
ls ~/.dotnet/tools/

# Add to fish permanently
set -U fish_user_paths $HOME/.dotnet/tools $fish_user_paths

# Reload fish config
source ~/.config/fish/config.fish
```

## DI Registration (Important)

The backend uses a generic repository pattern. The `IRepository<>` interface is registered in `Program.cs`:

```csharp
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
```

This registration is already in place. If you add services that depend on `IRepository<T>`, they will resolve correctly.

## Adding New Services

When adding new services, register them in `Program.cs` in the services section:

```csharp
// GUYS ADD YOUR SERVICES HERE!!
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
// Add your new services below:
// builder.Services.AddScoped<IYourService, YourService>();
```

## Troubleshooting

### Common Issues:

**dotnet-ef command not found:**
- Follow the PATH setup instructions for your platform above
- Restart your terminal after PATH changes

**App crashes on startup with DB connection error:**
- Ensure `Data/` directory exists and is writable
- Check connection string is set correctly for your platform

**Database errors:**
- Delete `Data/app.db` and run `dotnet ef database update` to recreate
- Check if migrations are applied: `dotnet ef migrations list`

**Build errors:**
```bash
dotnet clean
dotnet restore
dotnet build
```

**Port already in use:**
```bash
dotnet run --urls "http://localhost:5001"
```

## API Endpoints

Once running, explore available endpoints at:
- **Swagger UI**: `http://localhost:5000/swagger`
- **Health Check**: `http://localhost:5000/api/employees` (after adding controller)

## Seed Data

The application automatically creates three sample employees on first run:
- **Admin** (IT Department) - Full access
- **John Doe** (Sales Department) - Employee role
- **Jane Smith** (Marketing Department) - Employee role

## Local Development Notes

- **CORS**: Configured for React dev server at `http://localhost:3000`
- **Swagger UI**: Enabled at `/swagger` in development
- **Auto Migration**: Database is automatically created with seed data
- **Data Directory**: Created automatically if missing