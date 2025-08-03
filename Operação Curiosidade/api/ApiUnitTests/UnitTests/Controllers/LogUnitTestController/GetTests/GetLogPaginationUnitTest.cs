using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Pagination;

namespace ApiUnitTests.UnitTests.Controllers.LogUnitTestController.GetTests;

public class GetLogPaginationUnitTest : LogUnitTestController
{
    [Fact]
    public void GetPaginationLog_Filtering_OkResult()
    {
        var currentPage = 1;
        var pageSize = 1;
        var filter = "Editing";
        _mockRepo.Setup(repo => repo.GetLogs(filter, currentPage, pageSize))
            .Returns(new PagedList<Log>(
                list: _testLogs.Skip((currentPage - 1) * pageSize).Take(pageSize)
                .Where(l => l.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || l.Email.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || l.Action.Contains(filter, StringComparison.OrdinalIgnoreCase)).ToList(),
                currentPage: currentPage,
                count: _testLogs.Count,
                pageSize: pageSize
            ));

        var result = _controller.GetPagination(filter, currentPage, pageSize);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
    }
}
