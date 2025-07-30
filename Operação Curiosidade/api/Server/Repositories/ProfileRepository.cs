using Microsoft.AspNetCore.Http.HttpResults;
using Server.Models;
using Server.Pagination;
using Server.Services.Interfaces;
using System.Net;

namespace Server.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private static List<Profile> _profiles = new List<Profile>();
        private static int _profileId = 1;
        private const string FilePath = "Data/profiles.json";
        private readonly IEmailValidation _emailValidation;
        private readonly IProfileStatusValidation _statusValidation;
        private readonly IDataService _profileData;
        private readonly IPaginationHelper _paginationHelper;

        public ProfileRepository(IEmailValidation emailValidation, IProfileStatusValidation statusValidation, 
            IDataService profileData, IPaginationHelper paginationHelper)
        {
            _emailValidation = emailValidation;
            _statusValidation = statusValidation;
            _profileData = profileData;
            _paginationHelper = paginationHelper;
            _profiles = _profileData.LoadData<Profile>(FilePath);
            _profileId = _profiles.Count > 0 ? _profiles.Max(p => p.Id) + 1 : 1;
        }

        public IEnumerable<Profile> GetProfiles()
        {
            return _profiles.Where(p=>!p.Deleted).ToList();
        }

        public PagedList<Profile> GetProfilesPagination(int currentPage, int pageSize)
        {
            var profiles = _profiles.Where(p => !p.Deleted).ToList();
            var profilesPag = _paginationHelper.ToPagedList(profiles, currentPage, pageSize);
            return profilesPag;
        }

        public Profile? GetProfile(string email)
        {
            return _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
        }

        public (Profile? Profile, string? Error) CreateProfile(Profile profile)
        {
            if (_emailValidation.EmailAlreadyExist(profile.Email, _profiles))
                return (null, "Email already exists");

            if (_profiles.Count == 0)
                profile.Admin = true;

            profile.Id = _profileId++;
            profile.CreatedAt = DateTime.UtcNow;
            profile.Status = _statusValidation.StatusValid(profile) ? "Complete" : "Incomplete";

            _profiles.Add(profile);
            _profileData.SaveData(FilePath, _profiles);
            return (profile, null);
        }

        public (Profile? Profile, string? Error) UpdateProfile(string email, Profile profile)
        {
            var existingProfile = _profiles.FirstOrDefault(p => p.Email == email);
            
            if(existingProfile is null)
                return (null, $"Profile with email {email} not found");
            
            if (_emailValidation.EmailAlreadyExist(profile.Email, _profiles) && profile.Email != email)
                return (null, "Email already exists");

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
            return (existingProfile, null);
        }

        public bool DeleteProfile(string email)
        {
            var profile = _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
            if (profile == null) 
                return false;

            profile.Deleted = true;
            _profileData.SaveData(FilePath, _profiles);
            return true;
        }

    }
}
