using Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Server.DTOs.Mappings;

public static class ProfileDTOMappingExtension
{
    public static ProfileDTO? ToProfileDTO(this Profile profile)
    {
        if (profile is null)
            return null;
        
        return new ProfileDTO
        {
            Id = profile.Id,
            Name = profile.Name,
            Birthday = profile.Birthday,
            Email = profile.Email,
            Password = profile.Password,
            Address = profile.Address,
            MoreInformations = profile.MoreInformations,
            Interests = profile.Interests,
            Feelings = profile.Feelings,
            CoreValues = profile.CoreValues,
            Active = profile.Active,
            Status = profile.Status,
            Admin = profile.Admin,
            CreatedAt = profile.CreatedAt
        }; 
    }

    public static Profile? ToProfile (this ProfileDTO profileDTO)
    {
        if (profileDTO is null)
            return null;

        return new Profile()
        {
            Id = profileDTO.Id,
            Name = profileDTO.Name,
            Birthday = profileDTO.Birthday,
            Email = profileDTO.Email,
            Password = profileDTO.Password,
            Address = profileDTO.Address,
            MoreInformations = profileDTO.MoreInformations,
            Interests = profileDTO.Interests,
            Feelings = profileDTO.Feelings,
            CoreValues = profileDTO.CoreValues,
            Active = profileDTO.Active,
            Status = profileDTO.Status,
            Admin = profileDTO.Admin,
            CreatedAt = profileDTO.CreatedAt
        };
    }

    public static IEnumerable<ProfileDTO> ToProfileDTOList(this IEnumerable<Profile> profiles)
    {
        if(!profiles.Any() || profiles is null)
            return new List<ProfileDTO>();

        return profiles.Select(profile => new ProfileDTO
        {
            Id = profile.Id,
            Name = profile.Name,
            Birthday = profile.Birthday,
            Email = profile.Email,
            Password = profile.Password,
            Address = profile.Address,
            MoreInformations = profile.MoreInformations,
            Interests = profile.Interests,
            Feelings = profile.Feelings,
            CoreValues = profile.CoreValues,
            Active = profile.Active,
            Status = profile.Status,
            Admin = profile.Admin,
            CreatedAt = profile.CreatedAt
        }).ToList();
    }
}