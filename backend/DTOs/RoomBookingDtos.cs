namespace backend.DTOs
{
    public record RoomBookingDtos(int _roomId, int _userId, DateTime _bookingDate, TimeOnly _startTime, TimeOnly _endTime)
    {
        int RoomId = _roomId;
        int UserId = _userId;
        DateTime BookingDate = _bookingDate;
        TimeOnly StartTime = _startTime;
        TimeOnly EndTime = _endTime;
    }
}