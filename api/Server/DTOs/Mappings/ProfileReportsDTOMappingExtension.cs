using Server.Models;

namespace Server.DTOs.Mappings;

public static class ProfileReportsDTOMappingExtension
{
    public static ProfileReportsDTO? ToProfileReportsDTO(this Profile profile)
    {
        if (profile is null)
            return null;

        return new ProfileReportsDTO
        {
            Name = profile.Name,
            Email = profile.Email,
            Active = profile.Active,
            Status = profile.Status,
            CreatedAt = profile.CreatedAt
        };
    }

    public static IEnumerable<ProfileReportsDTO> ToProfileReportsDTOList(this IEnumerable<Profile> profiles)
    {
        if (profiles is null || !profiles.Any())
            return new List<ProfileReportsDTO>();

        return profiles.Select(profile => new ProfileReportsDTO
        {
            Name = profile.Name,
            Email = profile.Email,
            Active = profile.Active,
            Status = profile.Status,
            CreatedAt = profile.CreatedAt
        }).ToList();
    }
}