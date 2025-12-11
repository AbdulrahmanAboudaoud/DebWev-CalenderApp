using backend.Dtos;
using backend.Models;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AttendanceService
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IRepository<OfficeAttendance> _attendanceRepo;

        public AttendanceService(IRepository<OfficeAttendance> attendanceRepo)
        {
            _attendanceRepo = attendanceRepo;
        }

        public void UpdateUserStatus(int userId, string status)
        {
            var allowed = new[] { "office", "home", "sick", "vacation", "offline" };
            if (!allowed.Contains(status))
            {
                throw new ArgumentException("Invalid status value", nameof(status));
            }

            var today = DateTime.UtcNow.Date;

            // Find existing record for this user & date
            var existing = _attendanceRepo
                .Find(a => a.UserId == userId && a.Date == today)
                .FirstOrDefault();

            if (existing == null)
            {
                var attendance = new OfficeAttendance
                {
                    UserId = userId,
                    Date = today,
                    Status = status,
                    LastUpdatedAt = DateTime.UtcNow
                };

                _attendanceRepo.Add(attendance);
            }
            else
            {
                existing.Status = status;
                existing.LastUpdatedAt = DateTime.UtcNow;
                _attendanceRepo.Update(existing);
            }

            _attendanceRepo.SaveChanges();
        }

        public IEnumerable<AttendanceOverviewItem> GetTodayAttendance()
        {
            var today = DateTime.UtcNow.Date;

            // Use the repository query to build EF Core query
            var query = _attendanceRepo.Query()
                .Where(a => a.Date == today)
                .Include(a => a.Employee); // we need Employee.Name & Role

            var result = query.Select(a => new AttendanceOverviewItem
            {
                AttendanceId = a.AttendanceId,
                UserId = a.UserId,
                Name = a.Employee.Name,
                Role = a.Employee.Role,
                Status = a.Status,
                LastUpdatedAt = a.LastUpdatedAt
            });

            return result.ToList();
        }
    }
}
