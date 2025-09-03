using Server.Models;
using Server.Pagination;

namespace Server.Repositories;

public interface ILogRepository
{
    public IEnumerable<Log> GetLogs();
    public void CreateLog(Log log);
}