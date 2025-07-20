using Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Server.Repositories;

public class LogRepository : ILogRepository
{
    private static List<Log> _logs = new List<Log>();
    private static int _countId = 1;
    public IEnumerable<Log>? GetLogs()
    {
        return _logs.ToList();
    }

    public Log? GetLog(int id)
    {
        return _logs.FirstOrDefault(l => l.Id == id);
    }

    public Log? CreateLog(Log log)
    {
        if(log is null)
            throw new ArgumentNullException(nameof(log));

        log.Id = _countId++;
        log.CreatedAt = DateTime.UtcNow;
        _logs.Add(log);
        return log;
    }

}
