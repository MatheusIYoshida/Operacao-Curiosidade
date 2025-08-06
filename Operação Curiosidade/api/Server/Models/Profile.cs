namespace Server.Models;

public class Profile : BaseEntity
{
    public DateTime? Birthday { get; set; }
    public string? Password { get; set; }
    public string? Address { get; set; }
    public string? MoreInformations { get; set; }
    public string? Interests { get; set; }
    public string? Feelings { get; set; }
    public string? CoreValues { get; set; }
    public bool Active { get; set; }
    public string? Status { get; set; }
    public bool Admin { get; set; }
    public bool Deleted { get; set; } = false;
}