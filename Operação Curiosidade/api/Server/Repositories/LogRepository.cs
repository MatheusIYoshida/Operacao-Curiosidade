using Server.Models;
using Server.Pagination;
using Server.Services.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Server.Repositories;

public class LogRepository : ILogRepository
{
    private static List<Log> _logs = new List<Log>();
    private static int _countId = 1;
    private const string FilePath = "Data/logs.json";
    private readonly IDataService _logData;
    private readonly IPaginationHelper _paginationHelper;

    public LogRepository(IDataService logData, IPaginationHelper paginationHelper)
    {
        _logData = logData;
        _paginationHelper = paginationHelper;
        _logs = _logData.LoadData<Log>(FilePath) ?? new List<Log>();
        _countId = _logs.Count > 0 ? _logs.Max(l => l.Id) + 1 : 1;
    }

    public PagedList<Log> GetLogs(int currentPage, int pageSize)
    {
        var logs = _logs.OrderByDescending(l => l.CreatedAt).ToList();
        var logsPag = _paginationHelper.ToPagedList(logs, currentPage, pageSize);
        return logsPag;
    }

    public Log? CreateLog(Log log)
    {
        log.Id = _countId++;
        log.CreatedAt = DateTime.UtcNow;
        _logs.Add(log);
        _logData.SaveData(FilePath, _logs);
        return log;
    }
}
