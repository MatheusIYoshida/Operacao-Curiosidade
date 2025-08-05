using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;

namespace ApiUnitTests.UnitTests.Controllers.DashboardUnitTestController.GetTets;

public class GetRecentUnitTest : DashboardUnitTestController
{
    [Fact]
    public void GetRecent_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(_testProfiles);

        var result = _controller.GetRecentProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProfileListingDTO>>(okResult.Value);
        Assert.Equal(15, returnValue.Count);
    }

    [Fact]
    public void GetRecent_ZeroProfiles_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(new List<Profile>());

        var result = _controller.GetRecentProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProfileListingDTO>>(okResult.Value);
        Assert.Empty(returnValue);
    }
}