using Server.Data;
using Server.Models;

namespace Server.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Profile> GetProfiles()
        {
            return _context.Profiles.Where(p => !p.Deleted).ToList();
        }

        public Profile? GetProfile(string email)
        {
            return _context.Profiles.FirstOrDefault(p => p.Email == email && !p.Deleted);
        }

        public void CreateProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
            _context.SaveChanges();
        }

        public void UpdateProfile(Profile profile)
        {
            _context.Profiles.Update(profile);
            _context.SaveChanges();
        }
    }
}