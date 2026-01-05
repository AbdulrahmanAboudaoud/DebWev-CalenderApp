using backend.Models;
using backend.DTOs;

namespace backend.Services.RoomService;

public interface IRoomService
{
    IEnumerable<Room> GetAll();
    Room? GetById(int id);
    Room? Create(CreateRoomDto dto);
    Room? Update(int id, UpdateRoomDto dto);
    bool DeleteById(int id);
}