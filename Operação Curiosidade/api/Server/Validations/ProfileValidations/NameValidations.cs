using System.Text.RegularExpressions;

namespace Server.Validations.ProfileValidations;

public static class NameValidations
{
    public static string? NameIsValid(string name)
    {
        return Regex.IsMatch(name, @"^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$") ? null : "Invalid Name";
    }
}