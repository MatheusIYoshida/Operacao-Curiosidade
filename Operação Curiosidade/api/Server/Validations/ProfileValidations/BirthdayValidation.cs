namespace Server.Validations.ProfileValidations;

public static class BirthdayValidation
{
    public static string? BirthdayDateValid(DateTime? date)
    {
        var LimitDate = DateTime.UtcNow.Date.AddYears(-120);

        return (date != null && date > DateTime.UtcNow) ? "The birthday date cannot be in the future" :
            (date != null && date < LimitDate) ? $"The birthday date cannot be earlier than {LimitDate:dd/MM/yyyy}" : null;
    }
}
