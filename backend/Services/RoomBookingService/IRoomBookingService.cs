using backend.Models;
using backend.DTOs;

public interface IRoomBookingService
{
    IEnumerable<RoomBooking> GetAll();
    RoomBooking? GetById(int id);
    RoomBooking? GetByUserId(int userId);
    RoomBooking? Add(RoomBookingDtos roomBookingDto);
    RoomBooking? Update(int id, RoomBooking roomBooking);
    bool DeleteById(int id);
    bool DeleteByUserId(int userId);
}