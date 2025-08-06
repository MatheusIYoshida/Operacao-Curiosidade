using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.StringLengthValidationsUnitTest;

public class MinStringLengthUnitTest
{
    [Fact]
    public void MinStringLength_Valid_ReturnNull()
    {
        var field = "Testing";
        var minLength = 6;
        var fieldName = "Name";

        var result = StringLengthValidations.MinStringLength(field, minLength, fieldName);

        Assert.Null(result);
    }

    [Fact]
    public void MinStringLength_NullableField_ReturnNull()
    {
        string field = null;
        var minLength = 6;
        var fieldName = "Name";

        var result = StringLengthValidations.MinStringLength(field, minLength, fieldName);

        Assert.Null(result);
    }

    [Fact]
    public void MinStringLength_Invalid_ReturnStringError()
    {
        var field = "Test";
        var minLength = 6;
        var fieldName = "Name";

        var result = StringLengthValidations.MinStringLength(field, minLength, fieldName);

        Assert.NotNull(result);
        Assert.Equal("The field Name cannot be shorter than 6 characters", result);
    }
}
