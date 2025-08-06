using Server.Models;
using System.Net.Mail;

namespace Server.Validations.ProfileValidations
{
    public static class EmailValidations
    {
        public static string? EmailAlreadyExist(string email, IEnumerable<Profile> profiles)
        {
            if (profiles.Any(p => p.Email == email && !p.Deleted)) 
            {
                return "Email already exists";
            }
            return null;
        }

        public static string? EmailIsValid(string email)
        {
            try
            {
                new MailAddress(email);
                return null;
            }
            catch
            {
                return "Invalid email";
            }
        }
    }
}
