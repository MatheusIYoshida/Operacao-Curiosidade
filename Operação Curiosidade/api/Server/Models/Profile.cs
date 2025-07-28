using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Profile : BaseEntity
{
    [DataType(DataType.Date)]
    public DateTime? Birthday { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
    public string? Password { get; set; }

    [StringLength(200, ErrorMessage = "Address must have a maximum of 200 characters")]
    public string? Address { get; set; }

    [StringLength(2000, ErrorMessage = "More informations must have a maximum of 2000 characters")]
    public string? MoreInformations { get; set; }

    [StringLength(2000, ErrorMessage = "Interests must have a maximum of 2000 characters")]
    public string? Interests { get; set; }

    [StringLength(2000, ErrorMessage = "Feelings must have a maximum of 2000 characters")]
    public string? Feelings { get; set; }

    [StringLength(2000, ErrorMessage = "Core values must have a maximum of 2000 characters")]
    public string? CoreValues { get; set; }
    public bool Active { get; set; }
    public string? Status { get; set; }
    public bool Admin { get; set; }
    public bool Deleted { get; set; } = false;

}
