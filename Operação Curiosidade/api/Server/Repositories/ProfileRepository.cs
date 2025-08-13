using Server.DTOs;
using Server.Models;
using Server.Models.Enum;
using Server.Pagination;
using Server.Services;
using Server.Services.Interfaces;
using Server.Validations;

namespace Server.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private static List<Profile> _profiles = new List<Profile>();
        private static List<Log> _logs = new List<Log>();
        private static int _profileId = 1;
        private static int _countId = 1;
        private const string FilePath = "Data/profiles.json";
        private const string LogFilePath = "Data/logs.json";
        private readonly IProfileStatusVerification _statusValidation;
        private readonly IDataService _profileData;
        private readonly IPaginationHelper _paginationHelper;

        public ProfileRepository(IProfileStatusVerification statusValidation, 
            IDataService profileData, IPaginationHelper paginationHelper)
        {
            _statusValidation = statusValidation;
            _profileData = profileData;
            _paginationHelper = paginationHelper;
            _profiles = _profileData.LoadData<Profile>(FilePath);
            _logs = _profileData.LoadData<Log>(LogFilePath);
            _profileId = _profiles.Count > 0 ? _profiles.Max(p => p.Id) + 1 : 1;
            _countId = _logs.Count > 0 ? _logs.Max(p => p.Id) + 1 : 1;
        }

        public IEnumerable<Profile> GetProfiles()
        {
            return _profiles.Where(p=>!p.Deleted).ToList();
        }

        public PagedList<Profile> GetProfilesPagination(string? filter, int currentPage, int pageSize)
        {
            var profiles = _profiles.Where(p => !p.Deleted).ToList();
            if (!string.IsNullOrEmpty(filter))
            {
                profiles = profiles.Where(p =>p.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
                || p.Email.Contains(filter, StringComparison.OrdinalIgnoreCase)).ToList();
            }
            var profilesPag = _paginationHelper.ToPagedList(profiles, currentPage, pageSize);
            return profilesPag;
        }

        public Profile? GetProfile(string email)
        {
            return _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
        }

        public (Profile? Profile, ValidationResult? Error) CreateProfile(Profile profile, string nameCreate, string emailCreate)
        {
            var errors = profile.ValidateProfile(_profiles);
            if (!errors.IsValid)
                return (null, errors);

            if (_profiles.Count == 0)
                profile.Admin = true;

            profile.Id = _profileId++;
            profile.CreatedAt = DateTime.UtcNow;
            profile.Status = _statusValidation.StatusValid(profile) ? "Complete" : "Incomplete";

            var log = LogService.CreateLog(ELogAction.Create, profile.Email, nameCreate, emailCreate);
            
            _profiles.Add(profile);
            _profileData.SaveData(FilePath, _profiles);
            _logs.Add(log);
            _profileData.SaveData(LogFilePath, _logs);
            return (profile, null);
        }

        public (Profile? Profile, ValidationResult? Error) UpdateProfile(Profile profile, string email, string nameCreate,
            string emailCreate)
        {
            var existingProfile = _profiles.FirstOrDefault(p => p.Email == email);

            if (existingProfile is null)
            {
                var error = new ValidationResult();
                error.AddErrors("Profile not found");
                return (null, error);
            }

            var errors = profile.ValidateProfile(_profiles.Where(p => p.Email != email));
            if (!errors.IsValid)
                return (null, errors);

            var log = LogService.CreateLog(ELogAction.Update, existingProfile.Email, nameCreate, emailCreate);

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
            existingProfile.Status = _statusValidation.StatusValid(profile) ? "Complete" : "Incomplete";

            _profileData.SaveData(FilePath, _profiles);
            _logs.Add(log);
            _profileData.SaveData(LogFilePath, _logs);
            return (existingProfile, null);
        }

        public bool DeleteProfile(string email, string nameCreate, string emailCreate)
        {
            var profile = _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
            if (profile == null) 
                return false;

            profile.Deleted = true;

            var log = LogService.CreateLog(ELogAction.Delete, email, nameCreate, emailCreate);

            _profileData.SaveData(FilePath, _profiles);
            _logs.Add(log);
            _profileData.SaveData(LogFilePath, _logs);
            return true;
        }
    }
}