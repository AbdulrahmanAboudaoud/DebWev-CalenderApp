using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class GroupMembership
{
    public int UserId { get; set; }
    public int GroupId { get; set; }

    [ForeignKey("UserId")]
    public Employee Employee { get; set; } = default!;
    [ForeignKey("GroupId")]
    public Group Group { get; set; } = default!;
}