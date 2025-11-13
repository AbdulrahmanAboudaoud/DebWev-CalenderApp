using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public RoomBookingController(AppDbContext context)
    {
        _context = context;
    }
    
    // GET methods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomBooking>>> GetRoomBookings()
    {
        var allRoomBookings = await _context.RoomBookings.ToListAsync();
        return Ok(allRoomBookings);
    }

    public async Task<ActionResult<RoomBooking>> GetRoomBooking(int id)
    {
        var roomBooking = await _context.RoomBookings.FindAsync(id);
        if (roomBooking == null) return NotFound();
        return Ok(roomBooking);
    }
    
    // POST methods
    [HttpPost]
    public async Task<ActionResult<RoomBooking>> CreateEmployee([FromBody] RoomBooking roomBooking) // creates a new user
    {
        if (await _context.RoomBookings.AnyAsync(e => e.RoomId == roomBooking.RoomId && e.UserId == roomBooking.UserId))
        {
            return BadRequest("Something went wrong");
        }
        
        _context.RoomBookings.Add(roomBooking);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetRoomBooking), new { roomId = roomBooking.RoomId, userId = roomBooking.UserId}, roomBooking);
    }
}