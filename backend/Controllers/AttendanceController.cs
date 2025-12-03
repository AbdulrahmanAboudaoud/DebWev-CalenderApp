using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly AppDbContext _context;

    public AttendanceController(AppDbContext context)
    {
        _context = context;
    }

    // TODO later: get this from auth token 
    private int GetCurrentUserId()
    {
        return 2;
    }

    // PUT api/attendance/my-status
    [HttpPut("my-status")]
    public async Task<IActionResult> UpdateMyStatus([FromBody] UpdateStatusRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
            return BadRequest("Status is required.");

        var allowed = new[] { "office", "home", "sick", "vacation", "offline" };
        if (!allowed.Contains(request.Status))
            return BadRequest("Invalid status value.");

        var userId = GetCurrentUserId();
        var today = DateTime.UtcNow.Date;

        var existing = await _context.OfficeAttendances
            .SingleOrDefaultAsync(a => a.UserId == userId && a.Date == today);

        if (existing == null)
        {
            var attendance = new OfficeAttendance
            {
                UserId = userId,
                Date = today,
                Status = request.Status,
                LastUpdatedAt = DateTime.UtcNow
            };

            _context.OfficeAttendances.Add(attendance);
        }
        else
        {
            existing.Status = request.Status;
            existing.LastUpdatedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // GET api/attendance/today
    [HttpGet("today")]
    public async Task<ActionResult<IEnumerable<AttendanceOverviewItem>>> GetTodayAttendance()
    {
        var today = DateTime.UtcNow.Date;

        var records = await _context.OfficeAttendances
            .Where(a => a.Date == today)
            .Include(a => a.Employee)
            .ToListAsync();

        var result = records.Select(a => new AttendanceOverviewItem
        {
            AttendanceId = a.AttendanceId,
            UserId = a.UserId,
            Name = a.Employee.Name,   // from your Employee model
            Role = a.Employee.Role,   // from your Employee model
            Status = a.Status,
            LastUpdatedAt = a.LastUpdatedAt
        });

        return Ok(result);
    }
}
