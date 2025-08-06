using Server.Models;
using Server.Validations.ProfileValidations;

namespace Server.Validations;

public static class ProfileValidation
{
    public static ValidationResult ValidateProfile(this Profile profile, IEnumerable<Profile> listProfiles)
    {
        var result = new ValidationResult();
        result.AddErrors(RequiredFieldValidation.IsNotEmpty(profile.Name, "Name"));
        result.AddErrors(RequiredFieldValidation.IsNotEmpty(profile.Email, "Email"));
        result.AddErrors(RequiredFieldValidation.IsNotEmpty(profile.Password, "Password"));
        result.AddErrors(NameValidations.NameIsValid(profile.Name));
        result.AddErrors(EmailValidations.EmailAlreadyExist(profile.Email, listProfiles));
        result.AddErrors(EmailValidations.EmailIsValid(profile.Email));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Name, 100, "Name"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Email, 200, "Email"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Password, 100, "Password"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Address, 200, "Address"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.MoreInformations, 2000, "More Informations"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Interests, 2000, "Interests"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.Feelings, 2000, "Feelings"));
        result.AddErrors(StringLengthValidations.MaxStringLength(profile.CoreValues, 2000, "Core Values"));
        result.AddErrors(StringLengthValidations.MinStringLength(profile.Password, 6, "Password"));

        return result;
    }
}