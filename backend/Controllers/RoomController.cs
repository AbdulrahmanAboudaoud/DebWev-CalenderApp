using backend.Models;
using backend.Services.EmployeeService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Repository;
using backend.DTOs;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public RoomController(AppDbContext context)
    {
        _context = context;
    }
    
    // GET methods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
    {
        var allRooms = await _context.Rooms.ToListAsync();
        return Ok(allRooms);
    }

    public async Task<ActionResult<Room>> GetRoom(int id)
    {
        var room = await _context.Rooms.FindAsync(id);
        if (room == null) return NotFound();
        return Ok(room);
    }
    
    // POST methods
    [HttpPost]
    public async Task<ActionResult<Room>> CreateRoom([FromBody] Room room) // creates a new room
    {
        if (await _context.Rooms.AnyAsync(e => e.RoomName == room.RoomName))
        {
            return BadRequest("Room with the same name already exists");
        }
        
        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetRoom), new { id = room.RoomId }, room);
    }

    // PUT methods
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room room) // updates an existing room
    {
        var existingRoom = await _context.Rooms.FindAsync(id);
        if (existingRoom == null)
        {
            return NotFound();
        }

        existingRoom.RoomName = room.RoomName;
        existingRoom.Capacity = room.Capacity;
        existingRoom.Location = room.Location;

        await _context.SaveChangesAsync();
        return Ok(existingRoom);
    }

    // DELETE methods
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id) // deletes a room
    {
        var room = await _context.Rooms.FindAsync(id);
        if (room == null)
        {
            return NotFound();
        }

        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();
        return Ok();
    }
}