using System.ComponentModel.DataAnnotations;

namespace Server.DTOs;

public class ProfileListingDTO
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public bool Active { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
}