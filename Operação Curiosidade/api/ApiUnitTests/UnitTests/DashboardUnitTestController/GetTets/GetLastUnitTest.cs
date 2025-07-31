using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace ApiUnitTests.UnitTests.DashboardUnitTestController.GetTets;

public class GetLastUnitTest : DashboardUnitTestController
{
    [Fact]
    public void GetPending_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(_testProfiles);

        var result = _controller.GetLastProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<int>(okResult.Value);
        Assert.Equal(8, returnValue);
    }

    [Fact]
    public void GetPending_ZeroProfiles_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(new List<Profile>());

        var result = _controller.GetLastProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<int>(okResult.Value);
        Assert.Equal(0, returnValue);
    }
}
