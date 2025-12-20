using backend.DTOs;
using backend.Models;
using backend.Repository;

namespace backend.Services.VoteEventService;

public class VoteEventService : IVoteEventService
{
    private readonly IRepository<VoteEvent> _voteEventRepo;
    private readonly IRepository<Employee> _employeeRepo;

    public VoteEventService(IRepository<VoteEvent> voteEventRepo, IRepository<Employee> employeeRepo)
    {
        _voteEventRepo = voteEventRepo;
        _employeeRepo = employeeRepo;
    }

    public VoteEvent Create(CreateVoteEventDto voteEventDto)
    {
        // Validate that the creator exists
        var creator = _employeeRepo.GetById(voteEventDto.CreatedBy);
        if (creator == null)
            throw new Exception($"Employee with ID {voteEventDto.CreatedBy} not found");

        // Validate date logic
        if (voteEventDto.StartTime >= voteEventDto.EndTime)
            throw new Exception("Start time must be before end time");

        var newVoteEvent = new VoteEvent
        {
            Title = voteEventDto.Title,
            Location = voteEventDto.Location,
            Description = voteEventDto.Description,
            StartTime = voteEventDto.StartTime,
            EndTime = voteEventDto.EndTime,
            CreatedBy = voteEventDto.CreatedBy,
            Votes = 0
        };

        _voteEventRepo.Add(newVoteEvent);
        _voteEventRepo.SaveChanges();
        return newVoteEvent;
    }

    public bool Delete(int id)
    {
        var voteEvent = _voteEventRepo.Query()
            .FirstOrDefault(v => v.VoteEventId == id);
        if (voteEvent == null) return false;

        _voteEventRepo.Delete(voteEvent);
        _voteEventRepo.SaveChanges();
        return true;
    }

    public IEnumerable<VoteEvent> GetAll()
    {
        return _voteEventRepo.GetAll()
            .OrderByDescending(v => v.Votes);
    }

    public VoteEvent? GetById(int id)
    {
        return _voteEventRepo.Query()
            .FirstOrDefault(v => v.VoteEventId == id);
    }

    public IEnumerable<VoteEvent> GetByCreator(int creatorId)
    {
        return _voteEventRepo.Find(v => v.CreatedBy == creatorId);
    }

    public IEnumerable<VoteEvent> GetByTitle(string title)
    {
        return _voteEventRepo.Find(v => v.Title.Contains(title));
    }

    public VoteEvent? Update(int id, UpdateVoteEventDto voteEventDto)
    {
        var existingVoteEvent = _voteEventRepo.Query()
            .FirstOrDefault(v => v.VoteEventId == id);
        if (existingVoteEvent == null) return null;

        // Validate date logic
        if (voteEventDto.StartTime >= voteEventDto.EndTime)
            throw new Exception("Start time must be before end time");

        existingVoteEvent.Title = voteEventDto.Title;
        existingVoteEvent.Location = voteEventDto.Location;
        existingVoteEvent.Description = voteEventDto.Description;
        existingVoteEvent.StartTime = voteEventDto.StartTime;
        existingVoteEvent.EndTime = voteEventDto.EndTime;

        _voteEventRepo.Update(existingVoteEvent);
        _voteEventRepo.SaveChanges();

        return existingVoteEvent;
    }

    public VoteEvent? Vote(int id)
    {
        var voteEvent = _voteEventRepo.Query()
            .FirstOrDefault(v => v.VoteEventId == id);
        if (voteEvent == null) return null;

        voteEvent.Votes++;
        _voteEventRepo.Update(voteEvent);
        _voteEventRepo.SaveChanges();

        return voteEvent;
    }
}
