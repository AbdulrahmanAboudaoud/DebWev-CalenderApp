using backend.Models;
using backend.Repository;
using backend.DTOs;

public class RoomService : IRoomService
{
    private readonly IRepository<Room> _roomRepo;

    public RoomService(IRepository<Room> repository)
    {
        _roomRepo = repository;
    }

    public IEnumerable<Room> GetAll() => _roomRepo.GetAll();

    public Room Add(RoomDtos roomDto)
    {
        var room = new Room
        {
            RoomName = roomDto.roomName,
            Capacity = roomDto.capacity,
            Location = roomDto.location
        };

        _roomRepo.Add(room);
        _roomRepo.SaveChanges();
        return room;
    }

    public bool DeleteById(int id)
    {
        var room = _roomRepo.GetById(id);
        if (room == null) return false;

        _roomRepo.Delete(room);
        _roomRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Room> GetAll() => _roomRepo.GetAll();

    public Room? GetById(int id) => _roomRepo.GetById(id);

    public Room? GetByName(string name) => _roomRepo.Find(r => r.RoomName == name).FirstOrDefault();

    public Room? Update(int id, Room room)
    {
        var existingRoom = _roomRepo.GetById(id);
        if (existingRoom == null) return null;

        existingRoom.RoomName = room.RoomName;
        existingRoom.Capacity = room.Capacity;
        existingRoom.Location = room.Location;

        _roomRepo.Update(existingRoom);
        _roomRepo.SaveChanges();
        return existingRoom;
    }
}