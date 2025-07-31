using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Services.Interfaces;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public AuthController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] ProfileLoginDTO profileLoginDTO)
    {
        var token = _tokenService.GenerateTokenJWT(profileLoginDTO);

        if(token == "")
            return Unauthorized("Incorrect email or password");

        return Ok(new { token });
    }
}