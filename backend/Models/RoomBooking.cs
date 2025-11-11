namespace backend.Models;

public class RoomBooking
{
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime BookingDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public string Purpose { get; set; } = default!;

    public Employee Employee { get; set; } = default!;
    public Room Room { get; set; } = default!;
}