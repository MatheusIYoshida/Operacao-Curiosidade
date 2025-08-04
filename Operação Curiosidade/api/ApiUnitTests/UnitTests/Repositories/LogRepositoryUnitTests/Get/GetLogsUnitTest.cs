using Moq;
using Server.Models;
using Server.Pagination;

namespace ApiUnitTests.UnitTests.Repositories.LogRepositoryUnitTests.Get;

public class GetLogsUnitTest :LogRepositoryUnitTest
{
    [Fact]
    public void GetLogs_ReturnLog()
    {
        var currentPage = 1;
        var pageSize = 1;
        _mockPagination.Setup(mock => mock.ToPagedList(It.IsAny<List<Log>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Log>(
                list: listLogs.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: listLogs.Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetLogs("", currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Log>>(result);
        Assert.Equal(1, resultValue.Count);
        Assert.Equal(3, resultValue.TotalPage);
        Assert.True(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }

    [Fact]
    public void GetLogs_WithFilter_ReturnPagedLog()
    {
        var currentPage = 1;
        var pageSize = 1;
        var filter = "test3";
        var list = listLogs.Where(p => p.Name.Contains(filter, StringComparison.OrdinalIgnoreCase));
        _mockPagination.Setup(mock => mock.ToPagedList(It.IsAny<List<Log>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Log>(
                list: list.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: list.Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetLogs(filter, currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Log>>(result);
        Assert.Equal(1, resultValue.Count);
        Assert.All(result, p => Assert.Contains(filter, p.Name, StringComparison.OrdinalIgnoreCase));
        Assert.False(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }

    [Fact]
    public void GetLogs_EmptyList_ReturnEmptyList()
    {
        var currentPage = 1;
        var pageSize = 1;
        var list = new List<Log> { };
        _mockPagination.Setup(mock => mock.ToPagedList(It.IsAny<List<Log>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Log>(
                list: list.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: list.Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetLogs("", currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Log>>(result);
        Assert.Equal(0, resultValue.Count);
        Assert.False(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }
}
