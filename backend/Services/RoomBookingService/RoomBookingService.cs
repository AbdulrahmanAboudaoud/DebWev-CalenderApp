using backend.Models;
using backend.Repository;
using backend.DTOs;

namespace backend.Services.RoomBookingService;

public class RoomBookingService : IRoomBookingService
{
    private readonly IRepository<RoomBooking> _repository;

    public RoomBookingService(IRepository<RoomBooking> repository)
    {
        _repository = repository;
    }

    public RoomBooking Create(CreateRoomBookingDto dto)
    {
        var roomBooking = new RoomBooking
        {
            RoomId = dto.RoomId,
            UserId = dto.UserId,
            BookingDate = dto.BookingDate,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime
        };

        // Validation
        if(_repository.GetById(roomBooking.RoomId) != null)
        {
            throw new Exception("Room booking with the same ID already exists");
        }
        
        _repository.Add(roomBooking);
        _repository.SaveChanges();
        return roomBooking;
    }

    public IEnumerable<RoomBooking> GetAll() => _repository.GetAll();

    public RoomBooking? GetById(int id) => _repository.GetById(id);

    public RoomBooking? GetByUserId(int userId) => _repository.Find(r => r.UserId == userId).FirstOrDefault();

    public bool DeleteById(int id)
    {
        var roomBooking = _repository.GetById(id);
        if (roomBooking == null) return false;

        _repository.Delete(roomBooking);
        _repository.SaveChanges();
        return true;
    }

    public bool DeleteByUserId(int userId)
    {
        var roomBooking = _repository.Find(r => r.UserId == userId).FirstOrDefault();
        if (roomBooking == null) return false;

        _repository.Delete(roomBooking);
        _repository.SaveChanges();
        return true;
    }

    public RoomBooking? Update(int id, UpdateRoomBookingDto dto)
    {
        var existingRoomBooking = _repository.GetById(id);
        if (existingRoomBooking == null) return null;

        existingRoomBooking.RoomId = dto.RoomId;
        existingRoomBooking.UserId = dto.UserId;
        existingRoomBooking.BookingDate = dto.BookingDate;
        existingRoomBooking.StartTime = dto.StartTime;
        existingRoomBooking.EndTime = dto.EndTime;
        existingRoomBooking.Purpose = dto.Purpose;
        
        _repository.Update(existingRoomBooking);
        _repository.SaveChanges();
        return existingRoomBooking;
    }
}