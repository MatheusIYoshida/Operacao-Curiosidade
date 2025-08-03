using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.DTOs;
using Server.Models;

namespace ApiUnitTests.UnitTests.Controllers.ProfileUnitTestController.PostTests;

public class PostUnitTest : ProfileUnitTestController
{
    [Fact]
    public void Post_CreatedAtRouteResult()
    {
        var newProfileDTO = new ProfileDTO { Name = "Teste", Email = "Teste@gmail.com", Password = "123123" };
        var newProfile = new Profile { Name = "Teste", Email = "Teste@gmail.com", Password = "123123" };
        _mockRepo.Setup(repo => repo.CreateProfile(It.IsAny<Profile>())).Returns((newProfile, null));
    
        var result = _controller.Post(newProfileDTO);

        var createdAtRouteResult = Assert.IsType<CreatedAtRouteResult>(result.Result);
        Assert.Equal("GetProfile", createdAtRouteResult.RouteName);
        Assert.Equal(newProfileDTO.Email, ((ProfileDTO)createdAtRouteResult.Value).Email);
    }

    [Fact]
    public void Post_DuplicateEmail_ConflictResult()
    {
        var newProfileDTO = new ProfileDTO { Name = "Teste", Email = "teste1@gmail.com", Password = "123123" };
        var errorMessage = "Email already exists";
        _mockRepo.Setup(repo => repo.CreateProfile(It.IsAny<Profile>())).Returns((null, "Email already exists"));

        var result = _controller.Post(newProfileDTO);

        var conflictResult = Assert.IsType<ConflictObjectResult>(result.Result);
        Assert.Equal(errorMessage, conflictResult.Value);
    }

    [Fact]
    public void Post_BadRequestResult()
    {
        var newProfileDTO = new ProfileDTO { Name = "Teste", Email = "Teste@gmail.com", Password = "123123" };
        _mockRepo.Setup(repo => repo.CreateProfile(It.IsAny<Profile>())).Returns((null, "Some validation error"));

        var result = _controller.Post(newProfileDTO);

        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
        Assert.Equal("Some validation error", badRequestResult.Value);
    }
}