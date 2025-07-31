using Microsoft.IdentityModel.Tokens;
using Server.DTOs;
using Server.Repositories;
using Server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly IProfileRepository _repository;

    public TokenService(IConfiguration config, IProfileRepository repository)
    {
        _config = config;
        _repository = repository;

    }

    public string GenerateTokenJWT(ProfileLoginDTO profileLoginDTO)
    {
        var profileDataBase = _repository.GetProfile(profileLoginDTO.Email);
        if (profileDataBase == null || profileLoginDTO.Email != profileDataBase.Email || 
            profileLoginDTO.Password != profileDataBase.Password)
            return string.Empty;

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); 

        var claims = new[]
        {
            new Claim("Name", profileDataBase.Name),
            new Claim("Email", profileDataBase.Email),
            new Claim("Admin", profileDataBase.Admin.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:ValidIssuer"],
            audience: _config["Jwt:ValidAudience"],
            claims: claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}