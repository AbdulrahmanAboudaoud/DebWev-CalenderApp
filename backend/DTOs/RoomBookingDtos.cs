namespace backend.DTOs
{
    public record RoomBookingDtos(int roomId, int userId, DateTime bookingDate, TimeOnly startTime, TimeOnly endTime)
    {
        int RoomId = roomId;
        int UserId = userId;
        DateTime BookingDate = bookingDate;
        TimeOnly StartTime = startTime;
        TimeOnly EndTime = endTime;
    }
}