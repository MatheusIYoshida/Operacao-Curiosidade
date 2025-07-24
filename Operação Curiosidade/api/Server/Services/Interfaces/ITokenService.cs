using Server.DTOs;
using Server.Models;

namespace Server.Services.Interfaces;

public interface ITokenService
{
    string GenerateTokenJWT(ProfileLoginDTO profileLoginDTO);

}
