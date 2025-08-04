using Server.Models;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Update;

public class UpdateProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void UpdateProfile_ReturnProfile()
    {
        var email = "test3@gmail.com";
        Profile profile = new Profile() { Name = "test4", Email = email, Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.IsType<Profile>(result);
        Assert.Equal(profile.Name, result.Name);
        Assert.Equal(email, result.Email);
        Assert.Null(error);
    }

    [Fact]
    public void UpdateProfile_ProfileNotFound_ReturnError()
    {
        var email = "test4@gmail.com";
        Profile profile = new Profile() { Name = "test4", Email = email, Password = "123123" };

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.Null(result);
        Assert.IsType<string>(error);
        Assert.Equal("Profile not found", error);
    }

    [Fact]
    public void UpdateProfile_EmailAlreadyExist_ReturnError()
    {
        var email = "test3@gmail.com";
        Profile profile = new Profile() { Name = "test4", Email = "test@gmail.com", Password = "123123" };
        _mockEmailValidation.Setup(mock => mock.EmailAlreadyExist(profile.Email, listProfiles)).Returns(true);

        var (result, error) = _repository.UpdateProfile(email, profile);

        Assert.Null(result);
        Assert.IsType<string>(error);
        Assert.Equal("Email already exists", error);
    }
}