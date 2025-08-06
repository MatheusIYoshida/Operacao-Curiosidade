using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services;

public class ProfileStatusVerification : IProfileStatusVerification
{
    public bool StatusValid(Profile profile)
    {
        return profile.Birthday.HasValue && 
               !string.IsNullOrWhiteSpace(profile.Address) &&
               !string.IsNullOrWhiteSpace(profile.MoreInformations) &&
               !string.IsNullOrWhiteSpace(profile.Interests) &&
               !string.IsNullOrWhiteSpace(profile.Feelings) &&
               !string.IsNullOrWhiteSpace(profile.CoreValues);
    }
}