using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.RequiredFieldsValidationsUnitTest;

public class IsNotEmptyUnitTest
{
    [Fact]
    public void IsNotEmpty_Valid_ReturnNull()
    {
        var field = "test";
        var fieldName = "Name";

        var result = RequiredFieldValidation.IsNotEmpty(field, fieldName);

        Assert.Null(result);
    }

    [Fact]
    public void IsNotEmpty_EmptyField_ReturnStringError()
    {
        var field = "";
        var fieldName = "Name";

        var result = RequiredFieldValidation.IsNotEmpty(field, fieldName);

        Assert.NotNull(result);
        Assert.Equal("Enter your Name", result);
    }
}
