using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class EmailValidation : IEmailValidation
{
    public bool EmailAlreadyExist(string email, IEnumerable<Profile> profiles)
    {
        return profiles.Any(p => p.Email == email && !p.Deleted);
    }
}