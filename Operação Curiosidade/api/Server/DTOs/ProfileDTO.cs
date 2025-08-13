using System.Text.Json.Serialization;

namespace Server.DTOs;

public class ProfileDTO
{
    [JsonIgnore]
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime? Birthday { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Address { get; set; }
    public string? MoreInformations { get; set; }
    public string? Interests { get; set; }
    public string? Feelings { get; set; }
    public string? CoreValues { get; set; }
    public bool Active { get; set; }
    public string? Status { get; set; }
    public bool Admin { get; set; }
    public DateTime CreatedAt { get; set; }
}