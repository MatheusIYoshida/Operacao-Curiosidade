using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController.PutTests;

public class PutUnitTest : ProfileUnitTestController
{
    [Fact]
    public void Put_OkResult()
    {
        var testEmail = "test@gmail.com";
        var testProfileDTO = new ProfileDTO { Name = "Test", Email = testEmail, Password = "test123" };
        var testProfile = new Profile { Name = "Test", Email = testEmail, Password = "test123" };
        _mockRepo.Setup(repo => repo.GetProfile(testEmail)).Returns(testProfile);
        _mockRepo.Setup(repo => repo.UpdateProfile(testProfile)).Returns(It.IsAny<Profile>());

        var result = _controller.Put(testEmail, testProfileDTO);

        Assert.IsType<OkObjectResult>(result.Result);
        _mockRepo.Verify(repo => repo.UpdateProfile(It.Is<Profile>(p => p.Name == "Test")), Times.Once);
    }

    [Fact]
    public void Put_BadRequestResult()
    {
        var email = "fakeEmail@gmail.com";
        var fakeProfileDTO = new ProfileDTO { Name = "test", Email = "test@gmail.com", Password = "test123" };

        var result = _controller.Put(email, fakeProfileDTO);

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public void Put_NotFoundResult()
    {
        var email = "fake@gmail.com";
        var fakeProfileDTO = new ProfileDTO { Name = "test", Email = email, Password = "test123" };
        _mockRepo.Setup(repo => repo.GetProfile(email)).Returns((Profile)null);

        var result = _controller.Put(email, fakeProfileDTO);

        Assert.IsType<NotFoundResult>(result.Result);
        _mockRepo.Verify(repo => repo.UpdateProfile(It.IsAny<Profile>()), Times.Never);
    }
}
