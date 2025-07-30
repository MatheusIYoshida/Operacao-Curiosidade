using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController.DeleteTest;

public class DeleteUnitTest : ProfileUnitTestController
{
    [Fact]
    public void Delete_OkResult()
    {
        var email = "test@gmail.com";
        _mockRepo.Setup(repo => repo.DeleteProfile(email)).Returns(true);

        var result = _controller.Delete(email);

        Assert.IsType<OkObjectResult>(result);
        _mockRepo.Verify(repo => repo.DeleteProfile(email), Times.Once);
    }

    [Fact]
    public void Delete_InternalServerErrorResult()
    {
        var email = "test@gmail.com";
        _mockRepo.Setup(repo => repo.DeleteProfile(email)).Returns(false);

        var result = _controller.Delete(email);

        var errorResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, errorResult.StatusCode);
        var errorMessage = errorResult.Value.ToString();
        Assert.Contains($"Failed to delete profile email: {email}", errorMessage);
    }
}
