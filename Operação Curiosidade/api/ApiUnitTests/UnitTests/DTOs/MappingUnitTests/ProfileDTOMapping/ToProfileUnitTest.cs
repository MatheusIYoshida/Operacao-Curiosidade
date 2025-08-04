using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests.ProfileDTOMapping;

public class ToProfileUnitTest
{
    [Fact]
    public void ToProfile_CorrectConversion_ReturnProfile()
    {
        var date = DateTime.UtcNow;
        var profileDTO = new ProfileDTO
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
            CreatedAt = date
        };

        var result = profileDTO.ToProfile();

        Assert.IsType<Profile>(result);
        Assert.Equal(profileDTO.Id, result.Id);
        Assert.Equal(profileDTO.Name, result.Name);
        Assert.Equal(date, result.Birthday);
        Assert.Equal(profileDTO.Email, result.Email);
        Assert.Equal(profileDTO.Password, result.Password);
        Assert.Equal(profileDTO.Address, result.Address);
        Assert.Equal(profileDTO.MoreInformations, result.MoreInformations);
        Assert.Equal(profileDTO.Interests, result.Interests);
        Assert.Equal(profileDTO.Feelings, result.Feelings);
        Assert.Equal(profileDTO.CoreValues, result.CoreValues);
        Assert.True(result.Active);
        Assert.Equal(profileDTO.Status, result.Status);
        Assert.True(result.Admin);
        Assert.Equal(date, result.CreatedAt);
        Assert.False(result.Deleted);
    }

    [Fact]
    public void ToProfile_ProfileDTOIsNull_ReturnNull()
    {
        ProfileDTO profileDTO = null;

        var result = profileDTO.ToProfile();

        Assert.Null(result);
    }

    [Fact]
    public void ToProfile_OnlyRequiredFields_ReturnProfile()
    {
        var profileDTO = new ProfileDTO
        {
            Name = "Test",
            Email = "test@gmail.com",
            Password = "Password"
        };

        var result = profileDTO.ToProfile();

        Assert.IsType<Profile>(result);
        Assert.Equal(profileDTO.Name, result.Name);
        Assert.Equal(profileDTO.Email, result.Email);
        Assert.Equal(profileDTO.Password, result.Password);
        Assert.Null(result.Birthday);
    }
}
