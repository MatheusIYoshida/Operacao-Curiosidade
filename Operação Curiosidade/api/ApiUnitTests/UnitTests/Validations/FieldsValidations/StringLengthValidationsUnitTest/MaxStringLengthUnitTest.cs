using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.StringLengthValidationsUnitTest;

public class MaxStringLengthUnitTest
{
    [Fact]
    public void MaxStringLength_Valid_ReturnNull()
    {
        var field = "Test";
        var maxLength = 100;
        var fieldName = "Name";

        var result = StringLengthValidations.MaxStringLength(field, maxLength, fieldName);

        Assert.Null(result);
    }

    [Fact]
    public void MaxStringLength_NullableField_ReturnNull()
    {
        string field = null;
        var maxLength = 100;
        var fieldName = "Name";

        var result = StringLengthValidations.MaxStringLength(field, maxLength, fieldName);

        Assert.Null(result);
    }

    [Fact]
    public void MaxStringLength_Invalid_ReturnStringError()
    {
        var field = "Testing This Field";
        var maxLength = 10;
        var fieldName = "Name";

        var result = StringLengthValidations.MaxStringLength(field, maxLength, fieldName);

        Assert.NotNull(result);
        Assert.Equal("The field Name cannot be longer than 10 characters", result);
    }
}
