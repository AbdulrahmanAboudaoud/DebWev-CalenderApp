using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET methods
    [HttpGet] // gets all users
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        var allEmployees = await _context.Employees.ToListAsync();
        return Ok(allEmployees);
    }

    [HttpGet("{id}")] // gets user by id
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return NotFound();
        return Ok(employee);
    }

    // POST methods
    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee([FromBody] Employee employee) // creates a new user
    {
        if (await _context.Employees.AnyAsync(e => e.Email == employee.Email))
        {
            return BadRequest("Something went wrong");
        }
        
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetEmployee), new { id = employee.UserId }, employee);
    }
}