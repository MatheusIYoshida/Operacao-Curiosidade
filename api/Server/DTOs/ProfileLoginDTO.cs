using System.ComponentModel.DataAnnotations;

namespace Server.DTOs;

public class ProfileLoginDTO
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}