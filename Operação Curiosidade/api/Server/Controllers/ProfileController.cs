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

            return Ok(profiles.ToProfileListingDTOList());
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
        public ActionResult<ProfileDTO> Post([FromBody] ProfileDTO profileDTO)
        {
            var (createdProfile, error) = _repository.CreateProfile(profileDTO.ToProfile());

            if (error != null)
            {
                if (error == "Email already exists")
                    return Conflict(error);

                return BadRequest(error);
            }
            return new CreatedAtRouteResult("GetProfile", new { email = createdProfile.Email }, createdProfile.ToProfileDTO());
        }

        [HttpPut("by-email/{email}")]
        [Authorize]
        public ActionResult<ProfileDTO> Put(string email, [FromBody] ProfileDTO profileDTO)
        {
            var profile = profileDTO.ToProfile();
            var (updatedProfile, error) = _repository.UpdateProfile(email, profile);

            if (error != null) 
            {
                return error switch
                {
                    "Email already exists" => Conflict(error),
                    "Profile not found" => NotFound(error),
                    _ => BadRequest(error)
                };
            }

            return Ok(updatedProfile.ToProfileDTO());
        }

        [HttpDelete("by-email/{email}")]
        [Authorize]
        public ActionResult Delete(string email)
        {
            bool deletado = _repository.DeleteProfile(email);
            return deletado ? Ok($"Profile email: {email} deleted successfully!") : 
                StatusCode(500, $"Failed to delete profile email: {email}");
        }
    }
}