using backend.Models;

namespace backend.Services.EmployeeService
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee? GetEmployeeById(int id);
        Employee? AddEmployee(Employee employee);
        Employee? UpdateEmployee(Employee employee);
        bool DeleteEmployee(int id);
    }
}