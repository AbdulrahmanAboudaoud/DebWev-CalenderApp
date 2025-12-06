using backend.DTOs;
using backend.Models;
using backend.Services.VoteEventService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VoteEventsController : ControllerBase
{
    private readonly IVoteEventService _voteEventService;

    public VoteEventsController(IVoteEventService voteEventService)
    {
        _voteEventService = voteEventService;
    }

    // GET: api/voteevents
    [HttpGet]
    public ActionResult<IEnumerable<VoteEvent>> GetAll()
    {
        return Ok(_voteEventService.GetAll());
    }

    // GET: api/voteevents/{id}
    [HttpGet("{id:int}")]
    public ActionResult<VoteEvent> GetById(int id)
    {
        var voteEvent = _voteEventService.GetById(id);
        return voteEvent == null ? NotFound() : Ok(voteEvent);
    }

    // GET: api/voteevents/title/{title}
    [HttpGet("title/{title}")]
    public ActionResult<IEnumerable<VoteEvent>> GetByTitle(string title)
    {
        var voteEvents = _voteEventService.GetByTitle(title);
        return Ok(voteEvents);
    }

    // GET: api/voteevents/creator/{creatorId}
    [HttpGet("creator/{creatorId:int}")]
    public ActionResult<IEnumerable<VoteEvent>> GetByCreator(int creatorId)
    {
        var voteEvents = _voteEventService.GetByCreator(creatorId);
        return Ok(voteEvents);
    }

    // POST: api/voteevents
    [HttpPost]
    public ActionResult<VoteEvent> Create([FromBody] CreateVoteEventDto dto)
    {
        try
        {
            var createdVoteEvent = _voteEventService.Create(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdVoteEvent.VoteEventId }, createdVoteEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT: api/voteevents/{id}
    [HttpPut("{id:int}")]
    public ActionResult<VoteEvent> Update(int id, [FromBody] UpdateVoteEventDto dto)
    {
        try
        {
            var updatedVoteEvent = _voteEventService.Update(id, dto);
            return updatedVoteEvent == null ? NotFound() : Ok(updatedVoteEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE: api/voteevents/{id}
    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id)
    {
        return _voteEventService.Delete(id) ? Ok() : NotFound();
    }

    // POST: api/voteevents/{id}/vote
    [HttpPost("{id:int}/vote")]
    public ActionResult<VoteEvent> Vote(int id)
    {
        var voteEvent = _voteEventService.Vote(id);
        return voteEvent == null ? NotFound() : Ok(voteEvent);
    }
}
