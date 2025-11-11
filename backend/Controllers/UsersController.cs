using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    // Dependency injection provides the database context
    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET methods
    [HttpGet] // gets all users
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        var allEmployers = await _context.Employees.ToListAsync();
        return Ok(allEmployers); // Wrap in Ok() for 200 status
    }

    [HttpGet("id")] // gets user by id
    public async Task<ActionResult<Employee>> GetEmployer(int id)
    {
        var employer = await _context.Employees.FindAsync(id);
        if (employer == null) return NotFound(); // Handle not found
        return employer;
    }

    // POST methods
    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee([FromBody] Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEmployer), new { id = employee.UserId }, employee);
    }
}