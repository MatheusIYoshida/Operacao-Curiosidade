using Server.Models;
using Server.Models.Enum;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;
using Server.Validations;

namespace Server.Services;

public class ProfileService : IProfileService
{
    private readonly ILogRepository _logRepo;
    private readonly IProfileRepository _profileRepo;
    private readonly IPaginationHelper _paginationHelper;
    private readonly ILogService _logService;
    public ProfileService(ILogRepository logRepo, IProfileRepository profileRepo, IPaginationHelper paginationHelper, ILogService logService)
    {
        _logRepo = logRepo;
        _profileRepo = profileRepo;
        _paginationHelper = paginationHelper;
        _logService = logService;
    }

    public PagedList<Profile> GetProfilePaginationVerification(string? filter, int currentPage, int pageSize)
    {
        var profiles = _profileRepo.GetProfiles();

        if (!string.IsNullOrEmpty(filter))
        {
            profiles = profiles.Where(p => p.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || p.Email.Contains(filter, StringComparison.OrdinalIgnoreCase)).ToList();
        }
        var profilesPag = _paginationHelper.ToPagedList(profiles, currentPage, pageSize);
        return profilesPag;
    }

    public (Profile? Profile, ValidationResult? Error) CreateProfileVerification(Profile profile, string nameCreate, string emailCreate)
    {
        var profiles = _profileRepo.GetProfiles();

        var errors = profile.ValidateProfile(profiles);
        if (!errors.IsValid)
            return (null, errors);
        
        if (profiles.Count() == 0)
            profile.Admin = true;

        profile.CreatedAt = DateTime.UtcNow;
        profile.Status = ProfileStatusVerification.StatusValid(profile) ? "Complete" : "Incomplete";
        var log = _logService.CreateLog(ELogAction.Create, profile.Email, nameCreate, emailCreate);

        _profileRepo.CreateProfile(profile);
        _logRepo.CreateLog(log);

        return (profile, null);
    }

    public (Profile? Profile, ValidationResult? Error) UpdateProfileVerification(Profile profile, string email, string nameCreate,
        string emailCreate)
    {
        var profiles = _profileRepo.GetProfiles().ToList();
        var existingProfile = profiles.FirstOrDefault(p => p.Email == email);

        if (existingProfile is null)
        {
            var error = new ValidationResult();
            error.AddErrors("Profile not found");
            return (null, error);
        }

        var errors = profile.ValidateProfile(profiles.Where(p => p.Email != email));
        if (!errors.IsValid)
            return (null, errors);

        var log = _logService.CreateLog(ELogAction.Update, existingProfile.Email, nameCreate, emailCreate);

        existingProfile.Name = profile.Name;
        existingProfile.Birthday = profile.Birthday;
        existingProfile.Email = profile.Email;
        existingProfile.Password = profile.Password;
        existingProfile.Address = profile.Address;
        existingProfile.MoreInformations = profile.MoreInformations;
        existingProfile.Interests = profile.Interests;
        existingProfile.Feelings = profile.Feelings;
        existingProfile.CoreValues = profile.CoreValues;
        existingProfile.Active = profile.Active;
        existingProfile.Admin = profile.Admin;
        existingProfile.Status = ProfileStatusVerification.StatusValid(profile) ? "Complete" : "Incomplete";

        _profileRepo.UpdateProfile(existingProfile);
        _logRepo.CreateLog(log);

        return (existingProfile, null);
    }

    public bool DeleteProfileVerification(string email, string nameCreate, string emailCreate)
    {
        var profiles = _profileRepo.GetProfiles().ToList();
        var deletedProfile = profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
        if (deletedProfile == null)
            return false;

        deletedProfile.Deleted = true;

        var log = _logService.CreateLog(ELogAction.Delete, email, nameCreate, emailCreate);

        _profileRepo.UpdateProfile(deletedProfile);
        _logRepo.CreateLog(log);

        return true;
    }
}