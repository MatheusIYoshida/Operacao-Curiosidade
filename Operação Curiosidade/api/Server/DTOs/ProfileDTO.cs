using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.DTOs
{
    public class ProfileDTO
    {
        [JsonIgnore]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
        [RegularExpression(@"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$", ErrorMessage = "Invalid Name")]
        public string? Name { get; set; }

        [DataType(DataType.Date)] 
        public DateTime? Birthday { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress( ErrorMessage = "Invalid Email")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
        public string? Password { get; set; }
        public string? Address { get; set; }
        public string? MoreInformations { get; set; }
        public string? Interests { get; set; }
        public string? Feelings { get; set; }
        public string? CoreValues { get; set; }
        public bool Active { get; set; }
        public string? Status { get; set; }
        public bool Admin { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
