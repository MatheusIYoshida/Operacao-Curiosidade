using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Pagination;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileRepository _repository;

        public ProfileController(IProfileRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<ProfileDTO> GetAll()
        {
            var profiles = _repository.GetProfiles();

            return Ok(profiles.ToProfileReportsDTOList());
        }

        [HttpGet("Pagination")]
        [Authorize]
        public ActionResult<PagedList<ProfileDTO>> GetPagination([FromQuery] string? filter, [FromQuery] int currentPage, 
            [FromQuery] int pageSize) 
        {
            var profiles = _repository.GetProfilesPagination(filter, currentPage, pageSize);
            var response = new
            {
                Items = profiles.ToProfileListingDTOList(),
                profiles.CurrentPage,
                profiles.PageSize,
                TotalPages = profiles.TotalPage,
                profiles.HasPrevious,
                profiles.HasNext
            };

            return Ok(response);
        }

        [HttpGet("by-email/{email}", Name = "GetProfile")]
        [Authorize]
        public ActionResult<ProfileDTO> GetByEmail(string email)
        {
            var profile = _repository.GetProfile(email);

            if (profile == null)
                return NotFound("profile not found");

            return Ok(profile.ToProfileDTO());
        }

        [HttpPost]
        public ActionResult<ProfileDTO> Post([FromBody] ProfileDTO profileDTO, [FromQuery] string nameCreate, 
            [FromQuery] string emailCreate)
        {
            var (createdProfile, error) = _repository.CreateProfile(profileDTO.ToProfile(), nameCreate, emailCreate);

            if (error != null)
            {
                return BadRequest(new
                {
                    Title = "Validation Error",
                    error.Errors
                });
            }

            return new CreatedAtRouteResult("GetProfile", new { email = createdProfile.Email }, createdProfile.ToProfileDTO());
        }

        [HttpPut("by-email/{email}/{nameCreate}/{emailCreate}")]
        [Authorize]
        public ActionResult<ProfileDTO> Put(string email, string nameCreate, string emailCreate, [FromBody] ProfileDTO profileDTO)
        {
            var (updatedProfile, error) = _repository.UpdateProfile(profileDTO.ToProfile(), email, nameCreate, emailCreate);

            if (error != null) 
            {
                return BadRequest(new
                {
                    Title = "Validation Error",
                    error.Errors
                });
            }

            return Ok(updatedProfile.ToProfileDTO());
        }

        [HttpDelete("by-email/{email}/{nameCreate}/{emailCreate}")]
        [Authorize]
        public ActionResult Delete(string email, string nameCreate, string emailCreate)
        {
            bool deletado = _repository.DeleteProfile(email, nameCreate, emailCreate);
            return deletado ? Ok($"Profile email: {email} deleted successfully!") : 
                StatusCode(500, $"Failed to delete profile email: {email}");
        }
    }
}