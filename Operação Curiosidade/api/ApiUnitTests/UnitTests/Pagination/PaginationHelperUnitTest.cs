using Server.Models;
using Server.Pagination;

namespace ApiUnitTests.UnitTests.Pagination;

public class PaginationHelperUnitTest
{
    private readonly PaginationHelper _pagination = new PaginationHelper();
    private readonly int pageSize = 2;
    private readonly List<Profile> _listProfiles = new()
    {
        new Profile { Name = "Test 1", Email = "test1@gmail.com", Password = "123123" },
        new Profile { Name = "Test 2", Email = "test2@gmail.com", Password = "123123" },
        new Profile { Name = "Test 3", Email = "test3@gmail.com", Password = "123123" },
        new Profile { Name = "Test 4", Email = "test4@gmail.com", Password = "123123" },
        new Profile { Name = "Test 5", Email = "test5@gmail.com", Password = "123123" },
    };
    
    [Fact]
    public void ToPagedList_FirstPage_ReturnPagedList()
    {
        var currentPage = 1;

        var result = _pagination.ToPagedList(_listProfiles, currentPage, pageSize);

        Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(currentPage, result.CurrentPage);
        Assert.Equal(pageSize, result.PageSize);
        Assert.Equal(2, result.Count);
        Assert.Equal(3, result.TotalPage);
        Assert.True(result.HasNext);
        Assert.False(result.HasPrevious);
    }

    [Fact]
    public void ToPagedList_LastPage_ReturnPagedList()
    {
        var currentPage = 3;

        var result = _pagination.ToPagedList(_listProfiles, currentPage, pageSize);

        Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(currentPage, result.CurrentPage);
        Assert.Equal(pageSize, result.PageSize);
        Assert.Equal(1, result.Count);
        Assert.Equal(3, result.TotalPage);
        Assert.False(result.HasNext);
        Assert.True(result.HasPrevious);
    }

    [Fact]
    public void ToPagedList_MiddlePage_ReturnPagedList()
    {
        var currentPage = 2;

        var result = _pagination.ToPagedList(_listProfiles, currentPage, pageSize);

        Assert.IsType<PagedList<Profile>>(result);
        Assert.Equal(currentPage, result.CurrentPage);
        Assert.Equal(pageSize, result.PageSize);
        Assert.Equal(2, result.Count);
        Assert.Equal(3, result.TotalPage);
        Assert.True(result.HasNext);
        Assert.True(result.HasPrevious);
    }

    [Fact]
    public void ToPagedList_InvalidPageAndSize_AdjustsToDefaults()
    {
        var currentPage = 0;
        var pageSize = -1;

        var result = _pagination.ToPagedList(_listProfiles, currentPage, pageSize);

        Assert.Equal(1, result.CurrentPage);
        Assert.Equal(1, result.PageSize);
        Assert.Equal(5, result.TotalPage);
    }

    [Fact]
    public void ToPagedList_PageOutOfRange_AdjustsToLastPage()
    {
        var currentPage = 4;

        var result = _pagination.ToPagedList(_listProfiles, currentPage, pageSize);

        Assert.Equal(result.TotalPage, result.CurrentPage);
    }

    [Fact]
    public void ToPagedList_EmptyList_ReturnEmptyPagedList()
    {
        var currentPage = 1;
        var list = new List<Profile>();

        var result = _pagination.ToPagedList(list, currentPage, pageSize);

        Assert.Equal(0, result.TotalCount);
        Assert.False(result.HasNext);
        Assert.False(result.HasPrevious);
    }
}