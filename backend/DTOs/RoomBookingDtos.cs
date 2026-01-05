namespace backend.DTOs
{
    public record RoomBookingDto(int RoomId, int UserId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string? Purpose);
    public record CreateRoomBookingDto(int RoomId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string Purpose);
    public record UpdateRoomBookingDto(int RoomId, int UserId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string Purpose);
}