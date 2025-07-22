using System.ComponentModel.DataAnnotations;

namespace Server.DTOs;

public class CurrentProfileDTO
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
    [RegularExpression(@"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$", ErrorMessage = "Invalid Name")]
    public string? Name { get; set; }

    public bool Admin { get; set; }
}
