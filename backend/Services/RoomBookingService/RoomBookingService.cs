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

    public RoomBooking Create(CreateRoomBookingDto dto, int userId)
    {
        var roomBooking = new RoomBooking
        {
            RoomId = dto.RoomId,
            UserId = userId,
            BookingDate = dto.BookingDate,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            Purpose = dto.Purpose
        };

        // Check for conflicting bookings
        var conflictingBooking = _repository.Find(rb =>
            rb.RoomId == roomBooking.RoomId &&
            rb.BookingDate == roomBooking.BookingDate
        ).AsEnumerable()
            .FirstOrDefault(rb => rb.StartTime < roomBooking.EndTime && rb.EndTime > roomBooking.StartTime);

        if (conflictingBooking != null)
        {
            throw new Exception("Room is already booked for the selected time slot");
        }

        _repository.Add(roomBooking);
        _repository.SaveChanges();
        return roomBooking;
    }

    public IEnumerable<RoomBooking> GetAll() => _repository.GetAll();

    public RoomBooking? GetById(int id) => _repository.GetById(id);

    public IEnumerable<RoomBooking> GetByUserId(int userId) => _repository.Find(r => r.UserId == userId).ToList();

    public bool DeleteById(int id)
    {
        try
        {
            var roomBooking = _repository.GetById(id);
            if (roomBooking == null) return false;

            _repository.Delete(roomBooking);
            _repository.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to delete booking", ex);
        }

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