namespace backend.DTOs
{
    public record RoomBookingDtos(int _roomId, int _userId, DateTime _bookingDate, TimeOnly _startTime, TimeOnly _endTime, string _purpose);
    public record CreateRoomBookingDtos(int RoomId, int UserId, DateTime BookingDate, TimeOnly StartTime, TimeOnly EndTime, string Purpose);
}