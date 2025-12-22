namespace backend.DTOs
{
    public record RoomBookingDtos(int _roomId, int _userId, DateTime _bookingDate, TimeOnly _startTime, TimeOnly _endTime)
    {
        int roomId = _roomId;
        int userId = _userId;
        DateTime bookingDate = _bookingDate;
        TimeOnly startTime = _startTime;
        TimeOnly endTime = _endTime;
        string? purpose = default!;
    }
    public record CreateRoomBookingDtos(int RoomId, int UserId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string Purpose);
    public record UpdateRoomBookingDtos(int RoomId, int UserId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string Purpose);
}