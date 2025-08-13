using Server.Models;
using Server.Pagination;

namespace Server.Repositories;

public interface ILogRepository
{
    PagedList<Log> GetLogs(string? filter, int currentPage, int pageSize);
}