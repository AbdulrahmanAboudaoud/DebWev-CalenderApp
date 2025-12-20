using backend.Dtos;

namespace backend.Services.AttendanceService
{
    public interface IAttendanceService
    {
        /// Creates or updates today's attendance status for a given user.
        void UpdateUserStatus(int userId, string status);

        /// Returns today's attendance overview for all users that have a status.
        IEnumerable<AttendanceOverviewItem> GetTodayAttendance();
    }
}
