using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Pagination;

namespace ApiUnitTests.UnitTests.Controllers.ProfileUnitTestController.GetTests;

public class GetPaginationUnitTest : ProfileUnitTestController
{
    [Fact]
    public void GetPagination_OkResult()
    {
        var currentPage = 1;
        var pageSize = 1;
        var filter = "test2@gmail.com";
        _mockRepo.Setup(repo => repo.GetProfilesPagination(filter, currentPage, pageSize))
            .Returns(new PagedList<Profile>(
                list: _testProfiles.Where(l => l.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || l.Email.Contains(filter, StringComparison.OrdinalIgnoreCase))
                .Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: _testProfiles.Count,
                pageSize: pageSize
            ));

        var result = _controller.GetPagination(filter, currentPage, pageSize);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(200, okResult.StatusCode);
    }
}
