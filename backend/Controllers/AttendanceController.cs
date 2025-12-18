using System.Security.Claims;
using backend.Dtos;
using backend.Services.AttendanceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // require JWT
public class AttendanceController : ControllerBase
{
    private readonly IAttendanceService _attendanceService;

    public AttendanceController(IAttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            throw new Exception("User ID claim not found");
        }

        return int.Parse(userIdClaim.Value);
    }

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
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("today")]
    // Optional: [Authorize(Roles = "Admin")]
    public ActionResult<IEnumerable<AttendanceOverviewItem>> GetTodayAttendance()
    {
        var result = _attendanceService.GetTodayAttendance();
        return Ok(result);
    }
}
