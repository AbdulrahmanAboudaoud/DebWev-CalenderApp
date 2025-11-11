using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class OfficeAttendance
{
    [Key]
    public int AttendanceId { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } = default!;

    public Employee Employee { get; set; } = default!;
}