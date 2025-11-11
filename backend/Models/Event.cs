using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Event
{
    [Key]
    public int EventId { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime EventDate { get; set; }
    public int CreatedBy { get; set; }

    public Employee Creator { get; set; } = default!;
    public ICollection<EventParticipation> Participants { get; set; } = new List<EventParticipation>();
}