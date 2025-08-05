namespace Server.Pagination;

public interface IPaginationHelper
{
    public PagedList<T> ToPagedList<T>(IEnumerable<T> source, int currentPage, int pageSize);
}