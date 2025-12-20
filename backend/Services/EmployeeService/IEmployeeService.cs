using backend.DTOs;
using backend.Models;

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
        object Update(int id, EmployeeDto employee);
    }
}