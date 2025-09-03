using Server.Data;
using Server.Models;

namespace Server.Repositories;

public class LogRepository : ILogRepository
{
    private readonly ApplicationDbContext _context;

    public LogRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Log> GetLogs()
    {
        return _context.Logs.ToList();
    }

    public void CreateLog(Log log)
    {
        _context.Logs.Add(log);
        _context.SaveChanges();
    }
}