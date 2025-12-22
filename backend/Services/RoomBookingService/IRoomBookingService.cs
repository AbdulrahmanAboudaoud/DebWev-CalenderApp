using backend.Models;
using backend.DTOs;

public interface IRoomBookingService
{
    IEnumerable<RoomBooking> GetAll();
    RoomBooking? GetById(int id);
    RoomBooking? GetByUserId(int userId);
    RoomBooking? Create(CreateRoomBookingDto dto);
    RoomBooking? Update(int id, UpdateRoomBookingDto dto);
    bool DeleteById(int id);
    bool DeleteByUserId(int userId);
}