namespace backend.Dtos;

public class UpdateStatusRequest
{
    // "office" | "home" | "sick" | "vacation" | "offline"
    public string Status { get; set; } = default!;
}

public class AttendanceOverviewItem
{
    public int AttendanceId { get; set; }
    public int UserId { get; set; }

    public string Name { get; set; } = default!;
    public string Role { get; set; } = default!;

    public string Status { get; set; } = default!;
    public DateTime LastUpdatedAt { get; set; }
}
