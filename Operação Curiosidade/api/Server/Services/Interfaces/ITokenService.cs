namespace Server.Services.Interfaces;

public interface ITokenService
{
    string GenerateTokenJWT(string email);

}
