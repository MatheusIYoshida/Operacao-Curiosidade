namespace Server.Services;

public interface ITokenService
{
    string GenerateTokenJWT(string email);

}
