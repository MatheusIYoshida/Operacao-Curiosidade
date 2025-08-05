using System.ComponentModel.DataAnnotations;

namespace Server.DTOs;

public class ProfileLoginDTO
{
    [Required(ErrorMessage = "Email is required")]
    [StringLength(200, ErrorMessage = "Email must have a maximum of {1} characters")]
    [EmailAddress(ErrorMessage = "Invalid Email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between {2} and {1} characters")]
    public string? Password { get; set; }
}