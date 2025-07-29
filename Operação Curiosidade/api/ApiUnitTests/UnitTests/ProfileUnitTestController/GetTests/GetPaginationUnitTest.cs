using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController.GetTests;

public class GetPaginationUnitTest : ProfileUnitTestController
{
    [Fact]
    public void GetPagination_OkResult()
    {
        var currentPage = 1;
        var pageSize = 1;
        _mockRepo.Setup(repo => repo.GetProfilesPagination(currentPage, pageSize))
            .Returns(new PagedList<Profile>(
                list: _testProfiles.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: _testProfiles.Count,
                pageSize: pageSize
            ));

        var result = _controller.GetPagination(currentPage, pageSize);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(200, okResult.StatusCode);
    }
}
