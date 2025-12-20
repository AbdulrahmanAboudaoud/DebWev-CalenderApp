using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class OfficeAttendance
{
    [Key]
    public int AttendanceId { get; set; }

    // Link to User
    public int UserId { get; set; }

    // One status per day per user
    public DateTime Date { get; set; }

    // "office" | "home" | "sick" | "vacation" | "offline"
    [MaxLength(20)]
    public string Status { get; set; } = "offline";

    // For "Last updated: 2 min ago"
    public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public Employee Employee { get; set; } = default!;
}
