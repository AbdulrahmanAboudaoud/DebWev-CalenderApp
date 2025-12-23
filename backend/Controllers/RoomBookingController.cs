using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Services.RoomBookingService;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingService _service;
    
    public RoomBookingController(IRoomBookingService roomBookingService)
    {
        _service = roomBookingService;
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
    
    // POST methods
    [HttpPost]
    public async Task<ActionResult<RoomBooking>> CreateRoomBooking([FromBody] CreateRoomBookingDto dto) // creates a new room booking
    {
        try 
        {
            var createdRoomBooking = _service.Create(dto);
            return CreatedAtAction(nameof(GetRoomBooking), new { id = createdRoomBooking.RoomBookingId }, createdRoomBooking);
        }
        catch(Exception ex)
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
        var success = _service.DeleteById(id);
        if (!success) return NotFound();
        return Ok();
    }
}