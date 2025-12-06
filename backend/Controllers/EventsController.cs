using backend.DTOs;
using backend.Models;
using backend.Services.EventService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    // GET methods
    [HttpGet]
    public ActionResult<IEnumerable<Event>> GetAll()
    {
        return Ok(_eventService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Event> GetById(int id)
    {
        var eventItem = _eventService.GetById(id);
        return eventItem == null ? NotFound() : Ok(eventItem);
    }

    [HttpGet("title/{title}")]
    public ActionResult<IEnumerable<Event>> GetByTitle(string title)
    {
        var events = _eventService.GetByTitle(title);
        return Ok(events);
    }

    [HttpGet("creator/{creatorId:int}")]
    public ActionResult<IEnumerable<Event>> GetByCreator(int creatorId)
    {
        var events = _eventService.GetByCreator(creatorId);
        return Ok(events);
    }

    [HttpGet("upcoming")]
    public ActionResult<IEnumerable<Event>> GetUpcoming()
    {
        var events = _eventService.GetUpcoming();
        return Ok(events);
    }

    // POST methods
    [HttpPost]
    public ActionResult<Event> Create([FromBody] CreateEventDto dto)
    {
        try
        {
            var createdEvent = _eventService.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdEvent.EventId }, createdEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT methods
    [HttpPut("{id:int}")]
    public ActionResult<Event> Update(int id, [FromBody] UpdateEventDto dto)
    {
        try
        {
            var updatedEvent = _eventService.Update(id, dto);
            return updatedEvent == null ? NotFound() : Ok(updatedEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE methods
    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id)
    {
        return _eventService.Delete(id) ? Ok() : NotFound();
    }
}