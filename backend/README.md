# Backend — Run locally

Short tutorial: how to run the ASP.NET Core backend (uses SQLite).

Prerequisites
- .NET 9 SDK (verify with `dotnet --version`)
- Optional: `dotnet-ef` tool to run migrations (`dotnet tool install --global dotnet-ef`)

Steps
1. Open a terminal and go to the backend folder:

   ```bash
   cd backend
   ```

2. Restore, build and create data folder:

   ```bash
   dotnet restore
   dotnet build
   mkdir Data
   ```

3. Apply EF Core migrations (creates `Data/app.db`):

   ```bash
   dotnet ef database update
   ```

4. Run the API:

   ```bash
   dotnet run
   ```

By default, the API runs on http://localhost:5000 — open http://localhost:5000/swagger to explore endpoints.

Quick tips
- To change the URL: `dotnet run --urls "http://localhost:5001"`
- Windows env var for connection string (optional):
  ```cmd
  set ConnectionStrings__DefaultConnection="Data Source=Data/app.db"
  ```

That's it!
