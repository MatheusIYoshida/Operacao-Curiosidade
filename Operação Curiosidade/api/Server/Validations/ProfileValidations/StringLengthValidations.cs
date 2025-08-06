namespace Server.Validations.ProfileValidations;

public static class StringLengthValidations
{
    public static string? MaxStringLength(string? field, int maxLength, string fieldName)
    {
        if(!string.IsNullOrEmpty(field) && field.Length > maxLength)
        {
            return $"The field {fieldName} cannot be longer than {maxLength} characters";
        }
        return null;
    }

    public static string? MinStringLength(string? field, int minLength, string fieldName)
    {
        if(!string.IsNullOrEmpty(field) && field.Length < minLength)
        {
            return $"The field {fieldName} cannot be shorter than {minLength} characters";
        }
        return null;
    }
}