using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController.GetTests;

public class GetByEmailUnitTest : ProfileUnitTestController
{
    [Fact]
    public void GetByEmail_ExistingEmail_OkResult_ReturnProfile()
    {
        var testEmail = "test1@example.com";
        _mockRepo.Setup(repo => repo.GetProfile(testEmail))
            .Returns(_testProfiles.FirstOrDefault(t => t.Email == testEmail));

        var result = _controller.GetByEmail(testEmail);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<ProfileDTO>(okResult.Value);
        Assert.Equal(testEmail, returnValue.Email);
    }

    [Fact]
    public void GetByEmail_NonExistingEmail_NotFoundResult()
    {
        _mockRepo.Setup(repo => repo.GetProfile("any@gmail.com"))
            .Returns((Profile)null);

        var result = _controller.GetByEmail("fakeEmail@gmail.com");

        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.Equal(404, notFoundResult.StatusCode);
    }
}
