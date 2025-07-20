using Server.Models;

namespace Server.Services;

public class ProfileStatusValidation : IProfileStatusValidation
{
    public bool StatusValid(Profile profile)
    {
        return profile.Birthday.HasValue && 
               !string.IsNullOrWhiteSpace(profile.Birthday.ToString()) &&
               !string.IsNullOrWhiteSpace(profile.Address) &&
               !string.IsNullOrWhiteSpace(profile.MoreInformations) &&
               !string.IsNullOrWhiteSpace(profile.Interests) &&
               !string.IsNullOrWhiteSpace(profile.Feelings) &&
               !string.IsNullOrWhiteSpace(profile.CoreValues);
    }
}
