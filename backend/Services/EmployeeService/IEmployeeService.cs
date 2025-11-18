using backend.Models;
using DebWev_CalenderApp.DTOs;

namespace backend.Services.EmployeeService
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAll();
        Employee? GetById(int id);
        Employee? Add(Employee employee);
        Employee? Update(int id, EmployeeDto employee);
        bool DeleteById(int id);
        bool DeleteAll();
    }
}