using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace ApiUnitTests.UnitTests.DashboardUnitTestController.GetTets;

public class GetTotalUnitTets : DashboardUnitTestController
{
    [Fact]
    public void GetTotal_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(_testProfiles);

        var result = _controller.GetTotalProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<int>(okResult.Value);
        Assert.Equal(16, returnValue);
    }

    [Fact]
    public void GetTotal_ZeroProfiles_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(new List<Profile>());

        var result = _controller.GetTotalProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<int>(okResult.Value);
        Assert.Equal(0, returnValue);
    }
}
