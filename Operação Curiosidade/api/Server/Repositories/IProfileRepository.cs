using Server.Models;
using Server.Pagination;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        IEnumerable<Profile> GetProfiles();
        PagedList<Profile> GetProfilesPagination(string? filter, int currentPage, int pageSize);
        Profile? GetProfile(string email);
        (Profile? Profile, string? Error) CreateProfile(Profile profile);
        (Profile? Profile, string? Error) UpdateProfile(string email, Profile profile);
        bool DeleteProfile(string email);
    }
}
