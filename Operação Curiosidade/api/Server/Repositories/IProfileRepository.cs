using Server.Models;
using Server.Pagination;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        IEnumerable<Profile> GetProfiles();
        PagedList<Profile> GetProfilesPagination(int currentPage, int pageSize);
        Profile? GetProfile(string email);
        (Profile? Profile, string? Error) CreateProfile(Profile profile);
        Profile UpdateProfile(Profile profile);
        bool DeleteProfile(string email);
    }
}
