using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using backend.Services.AuthService;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var result = _authService.Login(request);
        if (result == null) return Unauthorized("Invalid email or password");
        return Ok(result);
    }

    [HttpGet("debug")]
    [Authorize]
    public IActionResult DebugToken()
    {
        var claims = User.Claims.Select(c => new
        {
            Type = c.Type,
            Value = c.Value
        }).ToList();

        return Ok(new
        {
            Message = "Current user claims",
            Claims = claims,
            UserIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
        });
    }
}
