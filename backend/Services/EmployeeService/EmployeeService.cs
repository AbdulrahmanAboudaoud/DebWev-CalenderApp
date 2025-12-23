using backend.Models;
using backend.Repository;
using backend.DTOs;
using BCrypt.Net;

namespace backend.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _employeeRepo;
        public EmployeeService(IRepository<Employee> employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }

        public IEnumerable<Employee> GetAll() => _employeeRepo.GetAll();

        public Employee? GetById(int id) => _employeeRepo.GetById(id);

        public Employee? Add(Employee employee)
        {
            // Hash password before saving
            employee.Password = BCrypt.Net.BCrypt.HashPassword(employee.Password);

            _employeeRepo.Add(employee);
            _employeeRepo.SaveChanges();
            return employee;
        }

        public Employee? Update(int id, EmployeeDto employee)
        {
            var existingEmployee = _employeeRepo.GetById(id);
            if (existingEmployee == null) return null;

            existingEmployee.Name = employee.name;
            existingEmployee.Email = employee.email;
            existingEmployee.Role = employee.role;
            existingEmployee.Department = employee.department;

            // Only hash if a new password is provided
            if (!string.IsNullOrWhiteSpace(employee.password))
            {
                existingEmployee.Password = BCrypt.Net.BCrypt.HashPassword(employee.password);
            }

            _employeeRepo.Update(existingEmployee);
            _employeeRepo.SaveChanges();
            return existingEmployee;
        }

        public bool DeleteById(int id)
        {
            var employee = _employeeRepo.GetById(id);
            if (employee == null) return false;

            _employeeRepo.Delete(employee);
            _employeeRepo.SaveChanges();
            return true;
        }

        public bool DeleteAll()
        {
            var employees = _employeeRepo.GetAll();
            foreach (var employee in employees)
            {
                _employeeRepo.Delete(employee);
            }
            _employeeRepo.SaveChanges();
            return true;
        }
    }
}
