using backend.DTOs;
using backend.Models;

namespace backend.Services.EventService;

public interface IEventService
{
    IEnumerable<Event> GetAll();
    Event? GetById(int id);
    IEnumerable<Event> GetByTitle(string title);
    IEnumerable<Event> GetByCreator(int creatorId);
    IEnumerable<Event> GetUpcoming();
    Event Create(CreateEventDto eventDto);
    Event? Update(int id, UpdateEventDto eventDto);
    bool Delete(int id);
}
