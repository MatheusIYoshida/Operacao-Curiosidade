using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Log : BaseEntity
{

    [Required(ErrorMessage = "Action is required")]
    public string? Action { get; set; }

}
