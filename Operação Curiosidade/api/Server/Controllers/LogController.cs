using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
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
    public ActionResult<IEnumerable<Log>> GetAll()
    {
        return Ok(_log.GetLogs().OrderByDescending(l => l.CreatedAt));
    }

    [HttpGet("by-id/{id}", Name = "GetLog")]
    [Authorize]
    public ActionResult<Log> GetLog(int id) 
    {
        var log = _log.GetLog(id);

        if (log is null)
            return NotFound("Log not found");

        return Ok(log);
    }

    [HttpPost]
    public ActionResult<Log> Post([FromBody] Log log)
    {
        var createdLog = _log.CreateLog(log);
        return new CreatedAtRouteResult("GetLog", new { id = createdLog.Id }, createdLog);
    }
}