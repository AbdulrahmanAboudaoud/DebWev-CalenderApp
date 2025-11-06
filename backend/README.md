Commands in `/Backend` terminal: 

# How to run the backend

First go to `/Backend` folder and run:
```BASH
dotnet restore
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet build
dotnet ef database update
```

Then, run: 
```BASH
dotnet run
```

In case of build errors: 

```BASH
dotnet clean 
dotnet build
```

http://localhost:5098/db-ping → should show { "connected": true }

http://localhost:5098/db-ping-raw → should show PostgreSQL version info