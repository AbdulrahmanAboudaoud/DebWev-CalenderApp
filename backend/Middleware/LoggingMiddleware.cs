using backend.Models;
using backend.Repository;

namespace backend.Middleware;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Method == "OPTIONS")
        {
            await _next(context);
            return;
        }

        var repo = context.RequestServices.GetRequiredService<IRepository<RequestLog>>();

        var log = new RequestLog
        {
            Method = context.Request.Method,
            Path = context.Request.Path,
            Timestamp = DateTime.Now
        };

        await _next(context);

        log.StatusCode = context.Response.StatusCode;

        repo.Add(log);
        repo.SaveChanges();
    }
}
