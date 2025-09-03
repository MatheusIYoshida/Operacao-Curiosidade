using Server.Models;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        IEnumerable<Profile> GetProfiles();
        Profile? GetProfile(string email);
        void CreateProfile(Profile profile);
        void UpdateProfile(Profile profiles);
    }
}