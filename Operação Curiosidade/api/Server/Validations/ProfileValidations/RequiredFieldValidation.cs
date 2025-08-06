namespace Server.Validations.ProfileValidations;

public static class RequiredFieldValidation
{
    public static string? IsNotEmpty(string? field, string fieldName)
    {
        return field.Length == 0 ? $"Enter your {fieldName}" : null;
    }
}