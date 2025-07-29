namespace Server.Pagination;

public class PaginationHelper : IPaginationHelper
{ 

    public PagedList<T> ToPagedList<T>(IEnumerable<T> source, int currentPage, int pageSize)
    {
        currentPage = Math.Max(1, currentPage); 
        pageSize = Math.Max(1, pageSize);

        var count = source.Count();
        var list = source.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
        return new PagedList<T>(list, currentPage, count, pageSize);
    }
}
