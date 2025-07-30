using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Pagination;
using Server.Repositories;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    private readonly ILogRepository _log;

    public LogController(ILogRepository log)
    {
        _log = log;
    }

    [HttpGet]
    [Authorize]
    public ActionResult<PagedList<Log>> GetPagination([FromQuery] int currentPage, [FromQuery] int pageSize)
    {
        var logs = _log.GetLogs(currentPage, pageSize);
        var response = new
        {
            Items = logs,
            CurrentPage = logs.CurrentPage,
            PageSize = logs.PageSize,
            TotalCount = logs.TotalCount,
            TotalPages = logs.TotalPage,
            HasPrevious = logs.HasPrevious,
            HasNext = logs.HasNext
        };
        return Ok(response);
    }

    [HttpPost]
    public ActionResult<Log> Post([FromBody] Log log)
    {
        var createdLog = _log.CreateLog(log);
        return CreatedAtAction(nameof(GetPagination), new { id = createdLog.Id }, createdLog);
    }
}