using Server.Models;
using Server.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Server.Repositories;

public class LogRepository : ILogRepository
{
    private static List<Log> _logs = new List<Log>();
    private static int _countId = 1;
    private const string FilePath = "Data/logs.json";
    private readonly IDataService _logData;

    public LogRepository(IDataService logData)
    {
        _logData = logData;
        _logs = _logData.LoadData<Log>(FilePath) ?? new List<Log>();
        _countId = _logs.Count > 0 ? _logs.Max(l => l.Id) + 1 : 1;
    }

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
        _logData.SaveData(FilePath, _logs);
        return log;
    }

}
