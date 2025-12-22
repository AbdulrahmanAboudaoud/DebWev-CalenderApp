using backend.Models;
using backend.Repository;
using backend.DTOs;

namespace backend.Services.RoomBookingService;

public class RoomBookingService : IRoomBookingService
{
    private readonly IRepository<RoomBooking> _roomBooking;

    public RoomBookingService(IRepository<RoomBooking> repository)
    {
        _roomBooking = repository;
    }

    public RoomBooking Create(RoomBookingDto roomBookingDto)
    {
        var roomBooking = new RoomBooking
        {
            RoomId = roomBookingDto._roomId,
            UserId = roomBookingDto._userId,
            BookingDate = roomBookingDto._bookingDate,
            StartTime = roomBookingDto._startTime,
            EndTime = roomBookingDto._endTime
        };

        _roomBooking.Add(roomBooking);
        _roomBooking.SaveChanges();
        return roomBooking;
    }

    public IEnumerable<RoomBooking> GetAll() => _roomBooking.GetAll();

    public RoomBooking? GetById(int id) => _roomBooking.GetById(id);

    public RoomBooking? GetByUserId(int userId) => _roomBooking.Find(r => r.UserId == userId).FirstOrDefault();

    public bool DeleteById(int id)
    {
        var roomBooking = _roomBooking.GetById(id);
        if (roomBooking == null) return false;

        _roomBooking.Delete(roomBooking);
        _roomBooking.SaveChanges();
        return true;
    }

    public bool DeleteByUserId(int userId)
    {
        var roomBooking = _roomBooking.Find(r => r.UserId == userId).FirstOrDefault();
        if (roomBooking == null) return false;

        _roomBooking.Delete(roomBooking);
        _roomBooking.SaveChanges();
        return true;
    }

    public RoomBooking? Update(int id, UpdateRoomBookingDto dto)
    {
        var existingRoomBooking = _roomBooking.GetById(id);
        if (existingRoomBooking == null) return null;

        existingRoomBooking.RoomId = dto.RoomId;
        existingRoomBooking.UserId = dto.UserId;
        existingRoomBooking.BookingDate = dto.BookingDate;
        existingRoomBooking.StartTime = dto.StartTime;
        existingRoomBooking.EndTime = dto.EndTime;
        existingRoomBooking.Purpose = dto.Purpose;
        
        _roomBooking.Update(existingRoomBooking);
        _roomBooking.SaveChanges();
        return existingRoomBooking;
    }
}