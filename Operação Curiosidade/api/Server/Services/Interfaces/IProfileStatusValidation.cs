using Server.Models;

namespace Server.Services.Interfaces;

public interface IProfileStatusValidation
{
    public bool StatusValid(Profile profile);
}