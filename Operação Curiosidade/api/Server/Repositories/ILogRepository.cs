using Server.Models;
using Server.Pagination;

namespace Server.Repositories;

public interface ILogRepository
{
    PagedList<Log> GetLogs(int currentPage, int pageSize);
    Log? CreateLog(Log log);
}
