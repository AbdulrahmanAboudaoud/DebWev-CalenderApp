using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class OfficeAttendance
{
    [Key]
    public int AttendanceId { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } = default!;

    [ForeignKey("UserId")]
    public Employee Employee { get; set; } = default!;
}