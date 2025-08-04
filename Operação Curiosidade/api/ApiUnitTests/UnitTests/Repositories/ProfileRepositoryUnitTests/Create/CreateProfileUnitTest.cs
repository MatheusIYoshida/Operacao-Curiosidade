using Moq;
using Server.Models;
using Server.Repositories;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Create;

public class CreateProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void CreateProfile_StatusIncomplete_ReturnProfile()
    {
        Profile profile = new Profile() { Name = "test4", Email = "test4@gmail.com", Password = "123123" };
        _mockEmailValidation.Setup(mock => mock.EmailAlreadyExist(profile.Email, listProfiles)).Returns(false);
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(false);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.IsType<Profile>(result);
        Assert.Null(error);
        Assert.Equal("Incomplete", result.Status);
    }

    [Fact]
    public void CreateProfile_EmailExists_ReturnError()
    {
        Profile profile = new Profile() { Name = "test4", Email = "test3@gmail.com", Password = "123123" };
        _mockEmailValidation.Setup(mock => mock.EmailAlreadyExist(profile.Email, listProfiles)).Returns(true);
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(false);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.Null(result);
        Assert.IsType<string>(error);
        Assert.Equal("Email already exists", error);
    }

    [Fact]
    public void CreateProfile_StatusComplete_ReturnError()
    {
        Profile profile = new Profile() { Name = "test4", Email = "test4@gmail.com", Password = "123123" };
        _mockEmailValidation.Setup(mock => mock.EmailAlreadyExist(profile.Email, listProfiles)).Returns(false);
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(true);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.IsType<Profile>(result);
        Assert.Null(error);
        Assert.Equal("Complete", result.Status);
    }

    [Fact]
    public void CreateProfile_FirstProfile_AdminTrue_ReturnProfile()
    {
        Profile profile = new Profile() { Name = "test4", Email = "test4@gmail.com", Password = "123123", Admin = false };
        var list = new List<Profile>() { };
        _mockDataService.Setup(mock => mock.LoadData<Profile>(It.IsAny<string>())).Returns(list);
        var _repository = new ProfileRepository(_mockEmailValidation.Object, _mockStatusValidation.Object,
            _mockDataService.Object, _mockPaginationHelper.Object);
        _mockEmailValidation.Setup(mock => mock.EmailAlreadyExist(profile.Email, list)).Returns(false);
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(true);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.IsType<Profile>(result);
        Assert.Equal(true, result.Admin);
        Assert.Null(error);
    }
}
