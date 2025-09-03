using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Pagination;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    private readonly ILogService _service;

    public LogController(ILogService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<PagedList<Log>> GetPagination([FromQuery] string? filter, [FromQuery] int currentPage, 
        [FromQuery] int pageSize)
    {
        var logs = _service.GetLogs(filter, currentPage, pageSize);
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