using Server.Models;

namespace Server.Repositories;

public interface ILogRepository
{
    IEnumerable<Log>? GetLogs();
    Log? GetLog(int id);
    Log? CreateLog(Log log);
}
