using backend.Models;
using backend.Repository;
using DebWev_CalenderApp.DTOs;

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
            existingEmployee.Password = employee.password;
            
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