using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class EventParticipation
{
    public int EventId { get; set; }
    public int UserId { get; set; }
    public string Status { get; set; } = default!;

    [ForeignKey("EventId")]
    public Event Event { get; set; } = default!;
    [ForeignKey("UserId")]
    public Employee Employee { get; set; } = default!;
}