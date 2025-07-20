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
            _repository = repository; //injeção de dependencia
        }

        [HttpGet]
        [Authorize]
        public ActionResult<ProfileDTO> GetAll()
        {
            var profiles = _repository.GetProfiles();

            if (profiles == null)
                return NotFound("No profile found");

            var profilesDTO = profiles.ToProfileDTOList();
            return Ok(profilesDTO);
        }

        [HttpGet("by-email/{email}", Name = "GetProfile")]
        [Authorize]
        public ActionResult<ProfileDTO> Get(string email)
        {
            var profile = _repository.GetProfile(email);

            if (profile == null)
                return NotFound("profile not found");

            var profileDTO = profile.ToProfileDTO();

            return Ok(profileDTO);
        }

        [HttpPost]
        public ActionResult<ProfileDTO> Post([FromBody] ProfileDTO profileDTO)
        {
            try
            {
                var profile = profileDTO.ToProfile();
                var createdProfile = _repository.CreateProfile(profile);
                var createdProfileDTO = createdProfile.ToProfileDTO();

                return new CreatedAtRouteResult("GetProfile", new { email = createdProfileDTO.Email }, createdProfileDTO);
            }
            catch (InvalidOperationException ioe) when (ioe.Message == "Email already exists")
            {
                return Conflict("Email Already Exist");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("by-email/{email}")]
        [Authorize]
        public ActionResult<ProfileDTO> Put(string email, [FromBody] ProfileDTO profileDTO)
        {
            if (profileDTO == null || email != profileDTO.Email)
                return BadRequest("Invalid data");

            var existing = _repository.GetProfile(email);
            if (existing == null)
                return NotFound();

            var profile = profileDTO.ToProfile();
            _repository.UpdateProfile(profile);
            var updatedProfileDTO = profile.ToProfileDTO();

            return Ok(updatedProfileDTO);
        }

        [HttpDelete("by-email/{email}")]
        [Authorize]
        public ActionResult<ProfileDTO> Delete(string email)
        {
            bool deletado = _repository.DeleteProfile(email);

            if (deletado)
            {
                return Ok($"Profile email: {email} deleted succesfully!");
            }
            else
            {
                return StatusCode(500, $"Failed to delete profile email: {email}");
            }
        }
    }
}