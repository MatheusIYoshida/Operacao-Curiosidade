using Server.Models;
using Server.Models.Enum;
using Server.Pagination;

namespace Server.Services.Interfaces;

public interface ILogService
{
    public PagedList<Log> GetLogs(string? filter, int currentPage, int pageSize);
    public Log CreateLog(ELogAction action, string email, string nameCreate, string emailCreate);
}
