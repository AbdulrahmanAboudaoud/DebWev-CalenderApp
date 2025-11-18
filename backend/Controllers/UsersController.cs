using backend.Models;
using backend.Services.EmployeeService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Repository;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IRepository<Employee> _repository;
    private readonly IEmployeeService _employeeService;

    // Dependency injection provides the database context
    public UsersController(IRepository<Employee> repository, IEmployeeService employeeService)
    {
        _repository = repository;
        _employeeService = employeeService;
    }

    // GET methods (read)
    [HttpGet] // gets all users
    public IActionResult GetAll() => Ok(_repository.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _repository.GetById(id);
        return product == null ? NotFound() : Ok(product);
    }


    // POST methods (create)
    [HttpPost] // adds a new user
    public IActionResult Add(Employee employee)
    {
        _repository.Add(employee);
        _repository.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = employee.UserId }, employee);
    }

    // PUT methods (update)
    [HttpPut("{id}")] // updates an existing user
    public IActionResult Update(int id, Employee employee)
    {
        if (id != employee.UserId) return BadRequest();
        _repository.Update(employee);
        _repository.SaveChanges();
        return NoContent();
    }

    // Delete methods (delete)
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) // deletes a user
    {
        var product = _repository.GetById(id);
        if (product == null) return NotFound();
        _repository.Delete(product);
        _repository.SaveChanges();
        return NoContent();
    }
}