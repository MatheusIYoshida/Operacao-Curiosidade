using Server.Models;
using Server.Models.Enum;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;

namespace Server.Services;

public class LogService : ILogService
{
    private readonly ILogRepository _logRepo;
    private readonly IPaginationHelper _paginationHelper;
    public LogService(ILogRepository logRepo, IPaginationHelper paginationHelper)
    {
        _logRepo = logRepo;
        _paginationHelper = paginationHelper;
    }

    public PagedList<Log> GetLogs(string? filter, int currentPage, int pageSize)
    {
        var logs = _logRepo.GetLogs().OrderByDescending(l => l.CreatedAt).ToList();
        if (!string.IsNullOrEmpty(filter))
        {
            logs = logs.Where(l => l.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || l.Email.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || l.Action.Contains(filter, StringComparison.OrdinalIgnoreCase)).ToList();
        }
        var logsPag = _paginationHelper.ToPagedList(logs, currentPage, pageSize);
        return logsPag;
    }

    public Log CreateLog(ELogAction action, string email, string nameCreate, string emailCreate)
    {
        string actionMessage;
        switch (action) 
        {
            case ELogAction.Create:
                actionMessage = email == emailCreate ? "Created their own profile" : $"Created the profile {email}";
                break;
            case ELogAction.Update:
                actionMessage = email == emailCreate ? "Updated their own profile" : $"Updated the profile {email}";
                break;
            case ELogAction.Delete:
                actionMessage = email == emailCreate ? "Deleted their own profile" : $"Deleted the profile {email}";
                break;
            default:
                actionMessage = "Unknown action";
                break;
        }
        return new Log() { Name = nameCreate, Email = emailCreate, Action = actionMessage, CreatedAt = DateTime.Now };
    }
}
