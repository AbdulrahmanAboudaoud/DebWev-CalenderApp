using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class VoteEvent
{
    [Key]
    public int VoteEventId { get; set; }
    public string Title { get; set; } = default!;
    public string Location { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public int CreatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    public Employee? Creator { get; set; }
    
    public int Votes { get; set; }
}