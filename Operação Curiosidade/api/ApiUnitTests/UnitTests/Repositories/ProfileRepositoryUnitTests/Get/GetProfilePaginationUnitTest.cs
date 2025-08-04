using Moq;
using Server.Models;
using Server.Pagination;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Get;

public class GetProfilePaginationUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void GetProfilesPagination_NoFilter_ReturnPagedProfile()
    {
        var currentPage = 1;
        var pageSize = 1;
        _mockPaginationHelper.Setup(mock => mock.ToPagedList(It.IsAny<List<Profile>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Profile>(
                list: listProfiles.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: listProfiles.Where(l => !l.Deleted).Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetProfilesPagination("", currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(1, resultValue.Count);
        Assert.Equal(2, resultValue.TotalPage);
        Assert.True(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }

    [Fact]
    public void GetProfilesPagination_WithFilter_ReturnPagedProfile()
    {
        var currentPage = 1;
        var pageSize = 1;
        var filter = "test3";
        var list = listProfiles.Where(p => p.Name.Contains(filter, StringComparison.OrdinalIgnoreCase));
        _mockPaginationHelper.Setup(mock => mock.ToPagedList(It.IsAny<List<Profile>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Profile>(
                list: list.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: list.Where(l => !l.Deleted).Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetProfilesPagination(filter, currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(1, resultValue.Count);
        Assert.All(result, p => Assert.Contains(filter, p.Name, StringComparison.OrdinalIgnoreCase));
        Assert.False(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }

    [Fact]
    public void GetProfilesPagination_EmptyList_ReturnEmptyList()
    {
        var currentPage = 1;
        var pageSize = 1;
        var list = new List<Profile> { };
        _mockPaginationHelper.Setup(mock => mock.ToPagedList(It.IsAny<List<Profile>>(), It.IsAny<int>(), It.IsAny<int>()))
            .Returns(new PagedList<Profile>(
                list: list.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                currentPage: currentPage,
                count: list.Where(l => !l.Deleted).Count(),
                pageSize: pageSize
            ));

        var result = _repository.GetProfilesPagination("", currentPage, pageSize);

        var resultValue = Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(0, resultValue.Count);
        Assert.False(resultValue.HasNext);
        Assert.False(resultValue.HasPrevious);
    }
}
