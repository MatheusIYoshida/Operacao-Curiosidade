using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.LogUnitTestController.GetTests;

public class GetLogPaginationUnitTest : LogUnitTestController
{
    [Fact]
    public void GetPaginationLog_OkResult()
    {
        var currentPage = 1;
        var pageSize = 1;
        _mockRepo.Setup(repo => repo.GetLogs(currentPage, pageSize))
            .Returns(new PagedList<Log>(
                list: _testLogs.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: _testLogs.Count,
                pageSize: pageSize
            ));

        var result = _controller.GetPagination(currentPage, pageSize);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
    }
}
