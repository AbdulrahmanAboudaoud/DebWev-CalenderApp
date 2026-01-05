using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Services.RoomBookingService;
using backend.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingService _service;

    public RoomBookingController(IRoomBookingService roomBookingService)
    {
        _service = roomBookingService;
    }

    // Helper function!
    private int GetUserIdFromToken()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return 0;
        
        if (int.TryParse(userIdClaim, out int userId))
        {
            return userId;
        }
        
        return 0;
    }

    // GET methods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomBooking>>> GetRoomBookings()
    {
        var allRoomBookings = _service.GetAll();
        return Ok(allRoomBookings);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RoomBooking>> GetRoomBooking(int id)
    {
        var roomBooking = _service.GetById(id);
        if (roomBooking == null) return NotFound();
        return Ok(roomBooking);
    }

    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<RoomBooking>>> GetMyBookings()
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (userId == 0) return Unauthorized("User ID not found in token");
            
            var bookings = _service.GetByUserId(userId);
            return Ok(bookings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST methods
    [HttpPost]
    public async Task<ActionResult<RoomBooking>> CreateRoomBooking([FromBody] CreateRoomBookingDto dto) // creates a new room booking
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (userId == 0) return Unauthorized("User ID not found in token");

            var BookingWithUserId = new
            {
                RoomId = dto.RoomId,
                UserId = userId,
                BookingDate = dto.BookingDate,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Purpose = dto.Purpose
            };

            var createdRoomBooking = _service.Create(dto, userId);
            return CreatedAtAction(nameof(GetRoomBooking), new { id = createdRoomBooking.RoomBookingId }, createdRoomBooking);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    // PUT methods
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomBooking(int id, [FromBody] UpdateRoomBookingDto dto)
    {
        var updated = _service.Update(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    // DELETE methods
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomBooking(int id)
    {
        try{        var userId = GetUserIdFromToken();
        var booking = _service.GetById(id);
        if (booking == null) return NotFound();

        if (booking.UserId != userId)
        {
            return Forbid("You are not authorized to delete this booking.");
        }

        var success = _service.DeleteById(id);
        if (!success) return NotFound();
        return Ok();}
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

    }
}