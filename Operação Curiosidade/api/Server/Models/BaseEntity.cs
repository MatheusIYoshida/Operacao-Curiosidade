using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models;

public class BaseEntity
{
    [JsonIgnore]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(200, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
    [RegularExpression(@"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$", ErrorMessage = "Invalid Name")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [StringLength(200, ErrorMessage = "Email must have a maximum of 200 characters")]
    [EmailAddress(ErrorMessage = "Invalid Email")]
    public string? Email { get; set; }

    public DateTime? CreatedAt { get; set; }
}
