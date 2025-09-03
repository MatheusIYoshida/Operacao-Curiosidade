using Server.Models;
using Server.Pagination;
using Server.Validations;

namespace Server.Services.Interfaces;

public interface IProfileService
{
    public PagedList<Profile> GetProfilePaginationVerification(string? filter, int currentPage, int pageSize);
    public (Profile? Profile, ValidationResult? Error) CreateProfileVerification(Profile profile, string nameCreate, string emailCreate);
    public (Profile? Profile, ValidationResult? Error) UpdateProfileVerification(Profile profile, string email, string nameCreate,
        string emailCreate);
    public bool DeleteProfileVerification(string email, string nameCreate, string emailCreate);
}
