using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Pagination;
using Server.Repositories;

namespace Server.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    private readonly ILogRepository _log;

    public LogController(ILogRepository log)
    {
        _log = log;
    }

    [HttpGet]
    public ActionResult<PagedList<Log>> GetPagination([FromQuery] string? filter, [FromQuery] int currentPage, 
        [FromQuery] int pageSize)
    {
        var logs = _log.GetLogs(filter, currentPage, pageSize);
        var response = new
        {
            Items = logs,
            logs.CurrentPage,
            logs.PageSize,
            TotalPages = logs.TotalPage,
            logs.HasPrevious,
            logs.HasNext
        };
        return Ok(response);
    }
}