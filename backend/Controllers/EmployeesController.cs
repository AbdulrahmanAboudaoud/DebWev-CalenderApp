using backend.Models;
using backend.Services.EmployeeService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Repository;
using DebWev_CalenderApp.DTOs;
namespace backend.Controllers;

// A CONTROLLER CONTROLERS HTTP REQUESTS IN A ORGANIZED WAY!
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    // GET methods (read)
    [HttpGet] // gets all users
    public IActionResult GetAll() => Ok(_employeeService.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _employeeService.GetById(id);
        return product == null ? NotFound() : Ok(product);
    }


    // POST methods (create)
    [HttpPost] // adds a new user
    public IActionResult Add(Employee employee)
    {
        return Ok(_employeeService.Add(employee));
    }

    // PUT methods (update)
    [HttpPut("{id:int}")] // updates an existing user
    public IActionResult Update(int id, [FromBody] EmployeeDto employee)
    {
        var x = _employeeService.Update(id, employee);
        return x==null? NotFound(): Ok(x);
    }

    // Delete methods (delete)
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) // deletes a user
    {
        return _employeeService.DeleteById(id) ? Ok() : NotFound();
    }
}