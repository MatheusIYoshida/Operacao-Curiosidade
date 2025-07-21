using Server.Models;

namespace Server.DTOs.Mappings;

public static class CurrentProfileDTOMapping
{
    public static CurrentProfileDTO? ToCurrentProfileDTO(this Profile profile)
    {
        if (profile is null)
            return null;

        return new CurrentProfileDTO
        {
            Name = profile.Name,
            Email = profile.Email
        };
    }
}
