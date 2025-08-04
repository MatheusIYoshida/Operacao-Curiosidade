using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests;

public class ToProfileDTOUnitTest
{
    [Fact]
    public void ToProfileDTO_CorrectConversion_ReturnsProfileDTO()
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

        var result = profile.ToProfileDTO();

        Assert.IsType<ProfileDTO>(result);
        Assert.Equal(profile.Id, result.Id);
        Assert.Equal(profile.Name, result.Name);
        Assert.Equal(date, result.Birthday);
        Assert.Equal(profile.Email, result.Email);
        Assert.Equal(profile.Password, result.Password);
        Assert.Equal(profile.Address, result.Address);
        Assert.Equal(profile.MoreInformations, result.MoreInformations);
        Assert.Equal(profile.Interests, result.Interests);
        Assert.Equal(profile.Feelings, result.Feelings);
        Assert.Equal(profile.CoreValues, result.CoreValues);
        Assert.True(result.Active);
        Assert.Equal(profile.Status, result.Status);
        Assert.True(result.Admin);
        Assert.Equal(date, result.CreatedAt);
    }

    [Fact]
    public void ToProfileDTO_ProfileIsNull_ReturnNull()
    {
        Profile profile = null;

        var result = profile.ToProfileDTO();

        Assert.Null(result);
    }

    [Fact]
    public void ToProfileDTO_OnlyRequiredFields_ReturnProfileDTO()
    {
        var profile = new Profile
        {
            Name = "Test",
            Email = "test@gmail.com",
            Password = "password"
        };

        var result = profile.ToProfileDTO();

        Assert.IsType<ProfileDTO>(result);
        Assert.Equal(profile.Name, result.Name);
        Assert.Equal(profile.Email, result.Email);
        Assert.Equal(profile.Password, result.Password);
        Assert.Null(result.Birthday);
    }
}
