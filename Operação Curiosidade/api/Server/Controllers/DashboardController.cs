using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IProfileRepository _repository;

    public DashboardController(IProfileRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("recent-profiles")]
    public ActionResult<IEnumerable<ProfileDTO>> GetRecentProfiles()
    {
        var recent = _repository.GetProfiles().OrderByDescending(p => p.CreatedAt).Take(15).ToProfileDTOList();

        return Ok(recent);
    }

    [HttpGet("total-profiles")]
    public IActionResult GetTotalProfiles() 
    {
        return Ok(_repository.GetProfiles().Count());
    }

    [HttpGet("last-profiles")]
    public IActionResult GetLastProfiles()
    {
        return Ok(_repository.GetProfiles().Count(p => p.CreatedAt > DateTime.UtcNow.AddDays(-30)));
    }

    [HttpGet("pending-profiles")]
    public IActionResult GetPendingProfiles()
    {
        return Ok(_repository.GetProfiles().Count(p => p.Status == "Incomplete"));
    }
}
