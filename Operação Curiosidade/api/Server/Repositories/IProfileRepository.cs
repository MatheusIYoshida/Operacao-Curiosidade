using Server.Models;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        IEnumerable<Profile> GetProfiles();
        Profile? GetProfile(string email);
        (Profile? Profile, string? Error) CreateProfile(Profile profile);
        Profile UpdateProfile(Profile profile);
        bool DeleteProfile(string email);
    }
}
