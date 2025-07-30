using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.LogUnitTestController.PostTests;

public class PostLogUnitTest : LogUnitTestController
{
    [Fact]
    public void PostLog_CreatedAtRouteResult()
    {
        var log = new Log { Name = "Test 4", Email = "test4@gmail.com", Action = "testing" };
        _mockRepo.Setup(repo => repo.CreateLog(log)).Returns(log);

        var result = _controller.Post(log);

        Assert.IsType<CreatedAtRouteResult>(result.Result);
        _mockRepo.Verify(repo => repo.CreateLog(log), Times.Once);
    }
}
