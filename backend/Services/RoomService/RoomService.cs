using backend.Models;
using backend.Repository;
using backend.DTOs;

namespace backend.Services.RoomService;

public class RoomService : IRoomService
{
    private readonly IRepository<Room> _room;

    public RoomService(IRepository<Room> repository)
    {
        _room = repository;
    }

    public Room Create(CreateRoomDto roomDto)
    {
        // Prepares room entity
        var room = new Room
        {
            RoomName = roomDto.RoomName,
            Capacity = roomDto.Capacity,
            Location = roomDto.Location
        };

        // Validates room entity
        if(_room.GetById(room.RoomId) != null)
        {
            throw new Exception("Room with the same ID already exists");
        }

        _room.Add(room);
        _room.SaveChanges();
        return room;
    }

    public bool DeleteById(int id)
    {
        var room = _room.GetById(id);
        if (room == null) return false;

        _room.Delete(room);
        _room.SaveChanges();
        return true;
    }

    public IEnumerable<Room> GetAll() => _room.GetAll();

    public Room? GetById(int id) => _room.GetById(id);

    public Room? Update(int id, UpdateRoomDto dto)
    {
        var existingRoom = _room.GetById(id);
        if (existingRoom == null) return null;

        existingRoom.RoomName = dto.RoomName;
        existingRoom.Capacity = dto.Capacity;
        existingRoom.Location = dto.Location;

        _room.Update(existingRoom);
        _room.SaveChanges();
        return existingRoom;
    }
}