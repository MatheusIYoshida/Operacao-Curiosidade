using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.NameValidationsUnitTest;

public class NameIsValidUnitTest
{
    [Fact]
    public void NameIsValid_Valid_ReturnNull()
    {
        var name = "Matheus";

        var result = NameValidations.NameIsValid(name);

        Assert.Null(result);
    }

    [Fact]
    public void NameIsValid_NotValid_ReturnStringError()
    {
        var name = "Matheus1";

        var result = NameValidations.NameIsValid(name);

        Assert.NotNull(result);
        Assert.Equal("Invalid Name", result);
    }
}