using Server.DTOs;
using Server.Models;
using Server.Models.Enum;

namespace Server.Services;

public static class LogService
{
    public static Log CreateLog(ELogAction action, string email, string nameCreate, string emailCreate)
    {
        string actionMessage;
        switch (action) 
        {
            case ELogAction.Create:
                actionMessage = email == emailCreate ? "Created their own profile" : $"Created the profile {email}";
                break;
            case ELogAction.Update:
                actionMessage = email == emailCreate ? "Updated their own profile" : $"Updated the profile {email}";
                break;
            case ELogAction.Delete:
                actionMessage = email == emailCreate ? "Deleted their own profile" : $"Deleted the profile {email}";
                break;
            default:
                actionMessage = "Unknown action";
                break;
        }
        return new Log() { Name = nameCreate, Email = emailCreate, Action = actionMessage, CreatedAt = DateTime.UtcNow };
    }
}
