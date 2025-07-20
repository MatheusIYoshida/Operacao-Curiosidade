using Server.Models;

namespace Server.Services;

public interface IProfileStatusValidation
{
    public bool StatusValid(Profile profile);
}
