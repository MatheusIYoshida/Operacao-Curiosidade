using Server.Models;

namespace Server.Services.Interfaces;

public interface IEmailValidation
{
    public bool EmailAlreadyExist(string email, IEnumerable<Profile> profiles);
}