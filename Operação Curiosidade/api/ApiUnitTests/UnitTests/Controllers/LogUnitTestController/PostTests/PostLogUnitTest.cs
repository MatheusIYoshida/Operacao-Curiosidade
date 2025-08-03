using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.Models;

namespace ApiUnitTests.UnitTests.Controllers.LogUnitTestController.PostTests;

public class PostLogUnitTest : LogUnitTestController
{
    [Fact]
    public void PostLog_CreatedAtRouteResult()
    {
        var log = new Log { Name = "Test 4", Email = "test4@gmail.com", Action = "testing" };
        _mockRepo.Setup(repo => repo.CreateLog(log)).Returns(log);

        var result = _controller.Post(log);

        Assert.IsType<CreatedAtActionResult>(result.Result);
        _mockRepo.Verify(repo => repo.CreateLog(log), Times.Once);
    }
}
