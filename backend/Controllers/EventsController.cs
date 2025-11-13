using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _context;

    public EventsController(AppDbContext context)
    {
        _context = context;
    }

    // GET methods
    [HttpGet] 
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        // Gets all Events from the database
        var allEvents = await _context.Events.ToListAsync();
        return Ok(allEvents); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        // Get a specific Event by ID
        var Event = await _context.Events.FindAsync(id);
        if (Event == null) return NotFound();
        return Event;
    }

    // POST methods
    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent([FromBody] Event Event)
    {
        _context.Events.Add(Event);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvent), new { id = Event.EventId }, Event);
    }
}