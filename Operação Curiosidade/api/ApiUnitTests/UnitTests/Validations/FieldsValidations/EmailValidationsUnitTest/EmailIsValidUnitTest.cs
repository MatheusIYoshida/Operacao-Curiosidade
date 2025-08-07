using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.EmailValidationsUnitTest;

public class EmailIsValidUnitTest
{
    [Fact]
    public void EmailIsValid_Valid_ReturnNull()
    {
        var email = "email@gmail.com";

        var result = EmailValidations.EmailIsValid(email);

        Assert.Null(result);
    }

    [Fact]
    public void EmailIsValid_Invalid_ReturnStringErroR()
    {
        var email = "test";

        var result = EmailValidations.EmailIsValid(email);

        Assert.NotNull(result);
        Assert.Equal("Invalid email", result);
    }
}
