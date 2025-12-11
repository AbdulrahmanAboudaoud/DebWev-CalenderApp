using backend.Dtos;
using backend.Services.AttendanceService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly IAttendanceService _attendanceService;

    public AttendanceController(IAttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    // TODO later: get this from auth token / claims
    private int GetCurrentUserId()
    {
        // For now, still using hardcoded user id (John Doe = 2)
        return 2;
    }

    // PUT api/attendance/my-status
    [HttpPut("my-status")]
    public IActionResult UpdateMyStatus([FromBody] UpdateStatusRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
            return BadRequest("Status is required.");

        try
        {
            var userId = GetCurrentUserId();
            _attendanceService.UpdateUserStatus(userId, request.Status);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            // e.g. invalid status value
            return BadRequest(ex.Message);
        }
    }

    // GET api/attendance/today
    [HttpGet("today")]
    public ActionResult<IEnumerable<AttendanceOverviewItem>> GetTodayAttendance()
    {
        var result = _attendanceService.GetTodayAttendance();
        return Ok(result);
    }
}
