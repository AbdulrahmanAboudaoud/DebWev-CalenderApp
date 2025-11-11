using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Room
{
    [Key]
    public int RoomId { get; set; }
    public string RoomName { get; set; } = default!;
    public int Capacity { get; set; }
    public string Location { get; set; } = default!;

    public ICollection<RoomBooking> RoomBookings { get; set; } = new List<RoomBooking>();
}