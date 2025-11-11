using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Group
{
    [Key]
    public int GroupId { get; set; }
    public string GroupName { get; set; } = default!;
    public string Description { get; set; } = default!;

    public ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();
}