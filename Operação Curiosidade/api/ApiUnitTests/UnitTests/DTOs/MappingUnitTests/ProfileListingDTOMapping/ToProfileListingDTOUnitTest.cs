using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests.ProfileListingDTOMapping;

public class ToProfileListingDTOUnitTest
{
    [Fact]
    public void ToProfileListingDTO_CorrectConversion_ReturnsProfileListingDTO()
    {
        var date = DateTime.Now;
        var profile = new Profile
        {
            Id = 1,
            Name = "Test",
            Birthday = date,
            Email = "test@gmail.com",
            Password = "Password",
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test",
            Active = true,
            Status = "Complete",
            Admin = true,
            CreatedAt = date,
            Deleted = false
        };

        var result = profile.ToProfileListingDTO();

        Assert.IsType<ProfileListingDTO>(result);
        Assert.Equal(profile.Name, result.Name);
        Assert.Equal(profile.Email, result.Email);
        Assert.True(result.Active);
        Assert.Equal(profile.Status, result.Status);
        Assert.Equal(date, result.CreatedAt);
    }

    [Fact]
    public void ToProfileListingDTO_ProfileIsNull_ReturnNull()
    {
        Profile profile = null;

        var result = profile.ToProfileListingDTO();

        Assert.Null(result);
    }
}