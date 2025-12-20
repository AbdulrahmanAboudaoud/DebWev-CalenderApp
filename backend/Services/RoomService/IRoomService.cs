using backend.Models;
using backend.DTOs;

public interface IRoomService
{
    IEnumerable<Room> GetAll();
    Room? GetById(int id);
    Room? GetByName(string name);
    Room? Add(RoomDtos room);
    Room? Update(int id, Room room);
    bool DeleteById(int id);
}