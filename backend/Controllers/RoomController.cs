using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomController : ControllerBase
{
    private readonly IRoomService _service;
    
    public RoomController(IRoomService roomService)
    {
        _service = roomService;
    }
    
    // GET methods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
    {
        var allRooms = _service.GetAll();
        return Ok(allRooms);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoom(int id)
    {
        var room = _service.GetById(id);
        if (room == null) return NotFound();
        return Ok(room);
    }
    
    // POST methods
    [HttpPost]
    public async Task<ActionResult<Room>> CreateRoom([FromBody] CreateRoomDto dto) // creates a new room
    {
        try 
        {
            var createdRoom = _service.Create(dto);
            return CreatedAtAction(nameof(GetRoom), new { id = createdRoom.RoomId }, createdRoom);
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT methods
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateRoom(int id, [FromBody] UpdateRoomDto dto) // updates an existing room
    {
        try
        {
            var updatedRoom = _service.Update(id, dto);
            return updatedRoom == null ? NotFound() : Ok(updatedRoom);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE methods
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id) // deletes a room
    {
        return _service.DeleteById(id) ? Ok() : NotFound();
    }
}