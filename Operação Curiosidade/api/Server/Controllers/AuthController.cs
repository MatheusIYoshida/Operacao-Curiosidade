﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.DTOs;
using Server.Models;
using Server.Repositories;
using Server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly IProfileRepository _repository;

    public AuthController(ITokenService tokenService, IProfileRepository repository)
    {
        _tokenService = tokenService;
        _repository = repository;
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