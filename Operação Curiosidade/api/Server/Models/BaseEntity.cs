using System.Text.Json.Serialization;

namespace Server.Models;

public class BaseEntity
{
    [JsonIgnore]
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public DateTime CreatedAt { get; set; }
}