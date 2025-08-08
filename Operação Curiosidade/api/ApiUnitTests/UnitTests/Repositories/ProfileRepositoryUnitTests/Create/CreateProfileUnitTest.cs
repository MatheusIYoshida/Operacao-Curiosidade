using Moq;
using Server.Models;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;
using Server.Validations;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Create;

public class CreateProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void CreateProfile_StatusIncomplete_ReturnProfile()
    {
        Profile profile = new Profile() { Name = "test", Email = "test4@gmail.com", Password = "123123" };
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(false);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.IsType<Profile>(result);
        Assert.Null(error);
        Assert.Equal("Incomplete", result.Status);
    }

    [Fact]
    public void CreateProfile_EmailExists_ReturnError()
    {
        Profile profile = new Profile() { Name = "test", Email = "test3@gmail.com", Password = "123123" };
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(false);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.Null(result);
        Assert.IsType<ValidationResult>(error);
        Assert.Contains("Email already exists", error.Errors);
    }

    [Fact]
    public void CreateProfile_StatusComplete_ReturnError()
    {
        Profile profile = new Profile() { Name = "test", Email = "test4@gmail.com", Password = "123123" };
        _mockStatusValidation.Setup(mock => mock.StatusValid(profile)).Returns(true);

        var (result, error) = _repository.CreateProfile(profile);

        Assert.IsType<Profile>(result);
        Assert.Null(error);
        Assert.Equal("Complete", result.Status);
    }
}