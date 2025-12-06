using backend.DTOs;
using backend.Models;
using backend.Repository;

namespace backend.Services.EventService;

public class EventService : IEventService
{
    private readonly IRepository<Event> _eventRepo;
    private readonly IRepository<Employee> _employeeRepo;

    public EventService(IRepository<Event> eventRepo, IRepository<Employee> employeeRepo)
    {
        _eventRepo = eventRepo;
        _employeeRepo = employeeRepo;
    }

    public Event Create(CreateEventDto eventDto)
    {
        // Validate that the creator exists
        var creator = _employeeRepo.GetById(eventDto.CreatedBy);
        if (creator == null)
            throw new Exception($"Employee with ID {eventDto.CreatedBy} not found");

        // Validate date logic
        if (eventDto.StartTime >= eventDto.EndTime)
            throw new Exception("Start time must be before end time");

        var newEvent = new Event
        {
            Title = eventDto.Title,
            Location = eventDto.Location,
            Description = eventDto.Description,
            StartTime = eventDto.StartTime,
            EndTime = eventDto.EndTime,
            CreatedBy = eventDto.CreatedBy
        };

        _eventRepo.Add(newEvent);
        _eventRepo.SaveChanges();
        return newEvent;
    }

    public bool Delete(int id)
    {
        var eventToDelete = _eventRepo.GetById(id);
        if (eventToDelete == null) return false;

        _eventRepo.Delete(eventToDelete);
        _eventRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Event> GetAll() => _eventRepo.GetAll();

    public Event? GetById(int id) => _eventRepo.GetById(id);

    public IEnumerable<Event> GetByCreator(int creatorId)
        => _eventRepo.Find(e => e.CreatedBy == creatorId);

    public IEnumerable<Event> GetByTitle(string title)
        => _eventRepo.Find(e => e.Title.Contains(title));

    public IEnumerable<Event> GetUpcoming()
        => _eventRepo.Find(e => e.StartTime > DateTime.UtcNow)
            .OrderBy(e => e.StartTime);

    public Event? Update(int id, UpdateEventDto eventDto)
    {
        var existingEvent = _eventRepo.GetById(id);
        if (existingEvent == null) return null;

        // Validate date logic
        if (eventDto.StartTime >= eventDto.EndTime)
            throw new Exception("Start time must be before end time");

        existingEvent.Title = eventDto.Title;
        existingEvent.Location = eventDto.Location;
        existingEvent.Description = eventDto.Description;
        existingEvent.StartTime = eventDto.StartTime;
        existingEvent.EndTime = eventDto.EndTime;

        _eventRepo.Update(existingEvent);
        _eventRepo.SaveChanges();

        return existingEvent;
    }
}
