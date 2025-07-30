using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.DashboardUnitTestController.GetTets;

public class GetRecentUnitTest : DashboardUnitTestController
{
    [Fact]
    public void GetRecent_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(_testProfiles);

        var result = _controller.GetRecentProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProfileDTO>>(okResult.Value);
        Assert.Equal(15, returnValue.Count);
    }

    [Fact]
    public void GetRecent_ZeroProfiles_OkResult()
    {
        _mockRepo.Setup(repo => repo.GetProfiles()).Returns(new List<Profile>());

        var result = _controller.GetRecentProfiles();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProfileDTO>>(okResult.Value);
        Assert.Equal(0, returnValue.Count);
    }
}
