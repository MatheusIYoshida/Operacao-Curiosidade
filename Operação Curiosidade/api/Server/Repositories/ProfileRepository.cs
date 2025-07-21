using Microsoft.AspNetCore.Http.HttpResults;
using Server.Models;
using Server.Services;
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

        public ProfileRepository(IEmailValidation emailValidation, IProfileStatusValidation statusValidation, IDataService profileData)
        {
            _emailValidation = emailValidation;
            _statusValidation = statusValidation;
            _profileData = profileData;
            _profiles = _profileData.LoadData<Profile>(FilePath) ?? new List<Profile>();
            _profileId = _profiles.Count > 0 ? _profiles.Max(p => p.Id) + 1 : 1;
        }

        public IEnumerable<Profile> GetProfiles()
        {
            return _profiles.Where(p=>!p.Deleted).ToList();
        }

        public Profile? GetProfile(string email)
        {
            return _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
        }

        public Profile CreateProfile(Profile profile)
        {
            if (profile is null)
                throw new InvalidOperationException("Profile is null");

            if (_emailValidation.EmailAlreadyExist(profile.Email, _profiles))
                throw new InvalidOperationException("Email already exists");

            if (_profiles.Count == 0)
                profile.Admin = true;

            profile.Id = _profileId++;
            profile.CreatedAt = DateTime.UtcNow;
            profile.Status = _statusValidation.StatusValid(profile) ? "Complete" : "Incomplete";

            _profiles.Add(profile);
            _profileData.SaveData(FilePath, _profiles);
            return profile;
        }

        public Profile UpdateProfile(Profile profile)
        {
            var existingProfile = _profiles.FirstOrDefault(p => p.Email == profile.Email);
            
            if(existingProfile is null)
                throw new KeyNotFoundException($"Profile with email {profile.Email} not found");
            
            if (existingProfile.Email != profile.Email && _emailValidation.EmailAlreadyExist(profile.Email, _profiles))
                throw new InvalidOperationException("Email already exists");

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
            return existingProfile;
        }

        public bool DeleteProfile(string email)
        {
            var profile = _profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
            if (profile == null) return false;

            profile.Deleted = true;
            _profileData.SaveData(FilePath, _profiles);
            return true;
        }

    }
}
