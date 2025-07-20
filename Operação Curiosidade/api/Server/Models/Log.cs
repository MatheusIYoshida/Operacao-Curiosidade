using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models;

public class Log : BaseEntity
{

    [Required(ErrorMessage = "Action is required")]
    public string? Action { get; set; }

}
