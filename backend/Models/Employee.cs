using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Employee
{
    [Key]
    public int UserId { get; set; }
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Role { get; set; } = default!;
    public string Department { get; set; } = default!;
    public string Password { get; set; } = default!;

    public ICollection<Event> EventsCreated { get; set; } = new List<Event>();
    public ICollection<EventParticipation> EventParticipations { get; set; } = new List<EventParticipation>();
    public ICollection<OfficeAttendance> OfficeAttendances { get; set; } = new List<OfficeAttendance>();
    public ICollection<RoomBooking> RoomBookings { get; set; } = new List<RoomBooking>();
    public ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();
}