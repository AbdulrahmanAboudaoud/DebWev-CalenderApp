using backend.Models;
using backend.Repository;
using backend.DTOs;

public class RoomBookingService : IRoomBookingService
{
    private readonly IRepository<RoomBooking> _roomBookingRepo;

    public RoomBookingService(IRepository<RoomBooking> repository)
    {
        _roomBookingRepo = repository;
    }

    public IEnumerable<RoomBooking> GetAll() => _roomBookingRepo.GetAll();
    public RoomBooking? GetById(int id) => _roomBookingRepo.GetById(id);

    public RoomBooking? GetByUserId(int userId) => _roomBookingRepo.Find(r => r.UserId == userId).FirstOrDefault();
    public RoomBooking Add(RoomBookingDtos roomBookingDto)
    {
        var roomBooking = new RoomBooking
        {
            RoomId = roomBookingDto._roomId,
            UserId = roomBookingDto._userId,
            BookingDate = roomBookingDto._bookingDate,
            StartTime = roomBookingDto._startTime,
            EndTime = roomBookingDto._endTime
        };

        _roomBookingRepo.Add(roomBooking);
        _roomBookingRepo.SaveChanges();
        return roomBooking;
    }

    public bool DeleteById(int id)
    {
        var roomBooking = _roomBookingRepo.GetById(id);
        if (roomBooking == null) return false;

        _roomBookingRepo.Delete(roomBooking);
        _roomBookingRepo.SaveChanges();
        return true;
    }

    public bool DeleteByUserId(int userId)
    {
        var roomBooking = _roomBookingRepo.Find(r => r.UserId == userId).FirstOrDefault();
        if (roomBooking == null) return false;

        _roomBookingRepo.Delete(roomBooking);
        _roomBookingRepo.SaveChanges();
        return true;
    }

    public RoomBooking? Update(int id, RoomBooking roomBooking)
    {
        var existingRoomBooking = _roomBookingRepo.GetById(id);
        if (existingRoomBooking == null) return null;

        existingRoomBooking.RoomId = roomBooking.RoomId;
        existingRoomBooking.UserId = roomBooking.UserId;
        existingRoomBooking.BookingDate = roomBooking.BookingDate;
        existingRoomBooking.StartTime = roomBooking.StartTime;
        existingRoomBooking.EndTime = roomBooking.EndTime;

        _roomBookingRepo.Update(existingRoomBooking);
        _roomBookingRepo.SaveChanges();
        return existingRoomBooking;
    }
}