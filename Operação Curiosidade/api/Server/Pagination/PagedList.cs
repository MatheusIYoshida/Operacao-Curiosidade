namespace Server.Pagination;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; set; }
    public int TotalPage { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public bool HasNext => CurrentPage < TotalPage;
    public bool HasPrevious => CurrentPage > 1;

    public PagedList(IEnumerable<T> list, int currentPage, int count, int pageSize)
    {
        CurrentPage = currentPage;
        TotalPage = (int)Math.Ceiling(count/(double) pageSize);
        PageSize = pageSize;
        TotalCount = count;

        AddRange(list);
    }
}
