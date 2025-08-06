using Server.Models;

namespace Server.Services.Interfaces;

public interface IProfileStatusVerification
{
    public bool StatusValid(Profile profile);
}