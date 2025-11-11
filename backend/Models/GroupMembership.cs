namespace backend.Models;

public class GroupMembership
{
    public int UserId { get; set; }
    public int GroupId { get; set; }

    public Employee Employee { get; set; } = default!;
    public Group Group { get; set; } = default!;
}