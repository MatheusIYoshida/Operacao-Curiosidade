using Server.Models;

namespace Server.DTOs.Mappings;

public static class ProfileListingDTOMappingExtension
{
    public static IEnumerable<ProfileListingDTO> ToProfileListingDTOList(this IEnumerable<Profile> profiles)
    {
        if (profiles is null || !profiles.Any())
            return new List<ProfileListingDTO>();

        return profiles.Select(profile => new ProfileListingDTO
        {
            Name = profile.Name,
            Email = profile.Email,
            Active = profile.Active,
            Status = profile.Status
        }).ToList();
    }
}
