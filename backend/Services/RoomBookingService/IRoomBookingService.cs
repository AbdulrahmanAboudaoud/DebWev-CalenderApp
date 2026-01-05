using backend.Models;
using backend.DTOs;

namespace backend.Services.RoomBookingService;

public interface IRoomBookingService
{
    IEnumerable<RoomBooking> GetAll();
    RoomBooking? GetById(int id);
    IEnumerable<RoomBooking> GetByUserId(int userId);
    RoomBooking? Create(CreateRoomBookingDto dto, int userId);
    RoomBooking? Update(int id, UpdateRoomBookingDto dto);
    bool DeleteById(int id);
    bool DeleteByUserId(int userId);
}