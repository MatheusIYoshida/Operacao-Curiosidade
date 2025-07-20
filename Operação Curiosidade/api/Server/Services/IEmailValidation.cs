using Server.Models;

namespace Server.Services;

public interface IEmailValidation
{
    public bool EmailAlreadyExist(string email, IEnumerable<Profile> profiles);
}
