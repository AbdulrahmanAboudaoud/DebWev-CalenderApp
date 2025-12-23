using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class RoomBooking
{
    [Key]
    public int RoomBookingId { get; set; }
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime BookingDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public string? Purpose { get; set; } = default!;

    [ForeignKey("UserId")]
    public Employee Employee { get; set; } = default!;
    [ForeignKey("RoomId")]
    public Room Room { get; set; } = default!;
}