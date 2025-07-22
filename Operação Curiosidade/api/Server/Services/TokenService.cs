using Microsoft.IdentityModel.Tokens;
using Server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateTokenJWT(string email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"])); //Recebe a chave e converte para um array de bytes
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); //Parametros (Chave/padrão para encriptar o token)

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, "User")
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:ValidIssuer"],
                audience: _config["Jwt:ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3), // Token expira em 1 hora
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
