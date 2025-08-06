using Server.Models;
using Server.Pagination;
using System.ComponentModel.DataAnnotations;
using ServerValidationResult = Server.Validations.ValidationResult;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        IEnumerable<Profile> GetProfiles();
        PagedList<Profile> GetProfilesPagination(string? filter, int currentPage, int pageSize);
        Profile? GetProfile(string email);
        (Profile? Profile, ServerValidationResult? Error) CreateProfile(Profile profile);
        (Profile? Profile, ServerValidationResult? Error) UpdateProfile(string email, Profile profile);
        bool DeleteProfile(string email);
    }
}