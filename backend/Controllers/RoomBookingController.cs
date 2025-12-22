using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Services;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingService _roomBookingService;
    
    public RoomBookingController(IRoomBookingService roomBookingService)
    {
        _roomBookingService = roomBookingService;
    }
    
    // GET methods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomBooking>>> GetRoomBookings()
    {
        var allRoomBookings = _roomBookingService.GetAll();
        return Ok(allRoomBookings); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RoomBooking>> GetRoomBooking(int id)
    {
        var roomBooking = _roomBookingService.GetById(id);
        if (roomBooking == null) return NotFound();
        return Ok(roomBooking);
    }
    
    // POST methods
    [HttpPost]
    public async Task<ActionResult<RoomBooking>> CreateRoomBooking([FromBody] CreateRoomBookingDtos createDto) // creates a new room booking
    {
        var dto = new RoomBookingDtos(createDto.RoomId, createDto.UserId, createDto.BookingDate, createDto.StartTime, createDto.EndTime, createDto.Purpose);
        
        var created = _roomBookingService.Add(dto);
        
        return CreatedAtAction(nameof(GetRoomBooking), new { id = created.RoomId }, created);
    }

    // PUT methods
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomBooking(int id, [FromBody] RoomBooking roomBooking)
    {
        var updated = _roomBookingService.Update(id, roomBooking);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    // DELETE methods
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomBooking(int id)
    {
        var success = _roomBookingService.DeleteById(id);
        if (!success) return NotFound();
        return Ok();
    }
}