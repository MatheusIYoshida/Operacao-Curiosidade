using Server.Models;
using Server.Validations;

namespace ApiUnitTests.UnitTests.Validations.ValidateProfile;

public class ValidateProfileUnitTest
{
    private readonly List<Profile> list = new List<Profile>() 
    { 
        new Profile() { Name = "fakeOne", Email = "test1@gmail.com", Password = "123123" },
        new Profile() { Name = "fakeTwo", Email = "test2@gmail.com", Password = "123123" },
        new Profile() { Name = "fakeThree", Email = "test3@gmail.com", Password = "123123" }
    }; 

    [Fact]
    public void ValidateProfile_OnlyRequiredFields_ProfileIsValid()
    {
        Profile profile = new Profile()
        {
            Name = "test",
            Email = "email@gmail.com",
            Password = "123123"
        };

        var result = profile.ValidateProfile(list);

        Assert.True(result.IsValid);
    }

    [Fact]
    public void ValidateProfile_AllFields_ProfileIsValid()
    {
        Profile profile = new Profile()
        {
            Name = "test",
            Email = "email@gmail.com",
            Password = "123123",
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test",
        };

        var result = profile.ValidateProfile(list);

        Assert.True(result.IsValid);
    }

    [Fact]
    public void ValidateProfile_ProfileIsNotValid()
    {
        Profile profile = new Profile()
        {
            Name = "test1",
            Email = "test1@gmail.com",
            Password = "1231"
        };

        var result = profile.ValidateProfile(list);

        Assert.False(result.IsValid);
        var error = result.Errors;
        Assert.Equal(3, error.Count);
        Assert.Contains("Invalid Name", error);
        Assert.Contains("Email already exists", error);
        Assert.Contains("The field Password cannot be shorter than 6 characters", error);
    }
}
