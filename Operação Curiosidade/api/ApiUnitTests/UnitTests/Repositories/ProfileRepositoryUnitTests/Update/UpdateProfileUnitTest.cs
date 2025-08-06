using Server.Models;
using Server.Validations;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Update;

public class UpdateProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void UpdateProfile_ReturnProfile()
    {
        var email = "test3@gmail.com";
        Profile profile = new Profile() { Name = "test", Email = email, Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.IsType<Profile>(result);
        Assert.Equal(profile.Name, result.Name);
        Assert.Equal(email, result.Email);
        Assert.Null(error);
    }

    [Fact]
    public void UpdateProfile_ChangeEmail_ReturnProfile()
    {
        var email = "test3@gmail.com";
        Profile profile = new Profile() { Name = "test", Email = "test5@gmail.com", Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.IsType<Profile>(result);
        Assert.Equal(profile.Name, result.Name);
        Assert.NotEqual(email, result.Email);
        Assert.Null(error);
    }

    [Fact]
    public void UpdateProfile_ProfileNotFound_ReturnError()
    {
        var email = "test4@gmail.com";
        Profile profile = new Profile() { Name = "test", Email = email, Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.Null(result);
        Assert.IsType<ValidationResult>(error);
        Assert.Contains("Profile not found", error.Errors);
    }

    [Fact]
    public void UpdateProfile_EmailAlreadyExist_ReturnError()
    {
        var email = "test3@gmail.com";
        Profile profile = new Profile() { Name = "test4", Email = "test@gmail.com", Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.Null(result);
        Assert.IsType<ValidationResult>(error);
        Assert.Contains("Email already exists", error.Errors);
    }
}