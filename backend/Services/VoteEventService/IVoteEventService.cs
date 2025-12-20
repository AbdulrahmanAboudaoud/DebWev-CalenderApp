using backend.DTOs;
using backend.Models;

namespace backend.Services.VoteEventService;

public interface IVoteEventService
{
    IEnumerable<VoteEvent> GetAll();
    VoteEvent? GetById(int id);
    IEnumerable<VoteEvent> GetByTitle(string title);
    IEnumerable<VoteEvent> GetByCreator(int creatorId);
    VoteEvent Create(CreateVoteEventDto voteEventDto);
    VoteEvent? Update(int id, UpdateVoteEventDto voteEventDto);
    bool Delete(int id);
    VoteEvent? Vote(int id);
}
