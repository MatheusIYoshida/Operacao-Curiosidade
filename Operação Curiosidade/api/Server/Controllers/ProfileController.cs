using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;
using Server.Repositories;
using Server.Services;

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

            return Ok(profiles.ToProfileDTOList());
        }

        [HttpGet("by-email/{email}", Name = "GetProfile")]

        public ActionResult<ProfileDTO> GetByEmail(string email)
        {
            var profile = _repository.GetProfile(email);

            if (profile == null)
                return NotFound("profile not found");

            return Ok(profile.ToProfileDTO());
        }

        [HttpGet("current/{email}")]
        [Authorize]
        public ActionResult<CurrentProfileDTO> GetCurrent(string email)
        {
            var profile = _repository.GetProfile(email);

            if (profile == null)
                return NotFound("Profile not found");

            return Ok(profile.ToCurrentProfileDTO());
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
            if (email != profileDTO.Email)
                return BadRequest("Invalid data");

            var existing = _repository.GetProfile(email);
            if (existing == null)
                return NotFound();

            var profile = profileDTO.ToProfile();
            _repository.UpdateProfile(profile);

            return Ok(profile.ToProfileDTO());
        }

        [HttpDelete("by-email/{email}")]
        [Authorize]
        public ActionResult<ProfileDTO> Delete(string email)
        {
            bool deletado = _repository.DeleteProfile(email);
            return deletado ? Ok($"Profile email: {email} deleted succesfully!") : StatusCode(500, $"Failed to delete profile email: {email}");
        }
    }
}