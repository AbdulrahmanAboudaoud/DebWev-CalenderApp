namespace backend.Models;

public class EventParticipation
{
    public int EventId { get; set; }
    public int UserId { get; set; }
    public string Status { get; set; } = default!;

    public Event Event { get; set; } = default!;
    public Employee Employee { get; set; } = default!;
}