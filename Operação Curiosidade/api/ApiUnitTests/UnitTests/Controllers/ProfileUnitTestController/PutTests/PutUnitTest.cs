using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.DTOs;
using Server.Models;

namespace ApiUnitTests.UnitTests.Controllers.ProfileUnitTestController.PutTests;

public class PutUnitTest : ProfileUnitTestController
{
    [Fact]
    public void Put_OkResult()
    {
        var testEmail = "test@gmail.com";
        var testProfileDTO = new ProfileDTO { Name = "Test", Email = testEmail, Password = "test123" };
        var testProfile = new Profile { Name = "Test", Email = testEmail, Password = "test123" };
        _mockRepo.Setup(repo => repo.UpdateProfile(testEmail, testProfile)).Returns((It.IsAny<Profile>(), null));

        var result = _controller.Put(testEmail, testProfileDTO);

        Assert.IsType<OkObjectResult>(result.Result);
        _mockRepo.Verify(repo => repo.UpdateProfile(testEmail, It.Is<Profile>(p => p.Name == "Test")), Times.Once);
    }

    [Fact]
    public void Post_DuplicateEmail_ConflictResult()
    {
        var testEmail = "test@gmail.com";
        var errorMessage = "Email already exists";
        _mockRepo.Setup(repo => repo.UpdateProfile(testEmail, It.IsAny<Profile>())).Returns((null, errorMessage));

        var result = _controller.Put(testEmail, It.IsAny<ProfileDTO>());

        var conflictResult = Assert.IsType<ConflictObjectResult>(result.Result);
        Assert.Equal(errorMessage, conflictResult.Value);
    }

    [Fact]
    public void Put_NotFoundResult()
    {
        var testEmail = "test@gmail.com";
        var errorMessage = "Profile not found";
        _mockRepo.Setup(repo => repo.UpdateProfile(testEmail, It.IsAny<Profile>())).Returns((null, errorMessage));

        var result = _controller.Put(testEmail, It.IsAny<ProfileDTO>());

        var conflictResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.Equal(errorMessage, conflictResult.Value);
    }

    [Fact]
    public void Put_BadRequestResult()
    {
        var testEmail = "test@gmail.com";
        _mockRepo.Setup(repo => repo.UpdateProfile(testEmail, It.IsAny<Profile>())).Returns((null, "error"));

        var result = _controller.Put(testEmail, It.IsAny<ProfileDTO>());

        var conflictResult = Assert.IsType<BadRequestObjectResult>(result.Result);
        Assert.Equal("error", conflictResult.Value);
    }
}
