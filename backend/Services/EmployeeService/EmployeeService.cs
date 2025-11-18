using backend.Models;
using backend.Repository;

namespace backend.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _employeeRepo;

        public EmployeeService(IRepository<Employee> employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        
        public IEnumerable<Employee> GetAllEmployees()
        {
            throw new NotImplementedException();
        }
        public Employee? GetEmployeeById(int id)
        {
            throw new NotImplementedException();
        }
        public Employee? AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public bool DeleteEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Employee? UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}