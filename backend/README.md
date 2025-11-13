Commands in `/Backend` terminal: 

# How to run the backend

First go to `/Backend` folder and run:
```BASH
dotnet restore
dotnet add package Microsoft.Extensions.Configuration;
dotnet add package Microsoft.AspNetCore.Http;
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Swashbuckle.AspNetCore
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