Commands in `/Backend` terminal: 

# How to run the backend

```
cd backend
dotnet restore
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet build
dotnet ef database update
dotnet run
```

In case of build errors: 

```
dotnet clean 
dotnet build
```

http://localhost:5098/db-ping → should show { "connected": true }

http://localhost:5098/db-ping-raw → should show PostgreSQL version info