using Server.DTOs;
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
        (Profile? Profile, ServerValidationResult? Error) CreateProfile(Profile profile, string nameCreate, string emailCreate);
        (Profile? Profile, ServerValidationResult? Error) UpdateProfile(Profile profile, string email, string nameCreate, 
            string emailCreate);
        bool DeleteProfile(string email, string nameCreate, string emailCreate);
    }
}