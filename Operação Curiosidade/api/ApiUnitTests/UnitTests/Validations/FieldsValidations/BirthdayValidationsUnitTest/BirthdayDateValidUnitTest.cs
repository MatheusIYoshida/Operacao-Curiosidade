using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.BirthdayValidationsUnitTest;

public class BirthdayDateValidUnitTest
{
    [Fact]
    public void BirthdayDateValid_Valid_ReturnNull()
    {
        var date = DateTime.UtcNow;

        var result = BirthdayValidation.BirthdayDateValid(date);

        Assert.Null(result);
    }

    [Fact]
    public void BirthdayDateValid_FutureDate_ReturnStringError()
    {
        var date = DateTime.UtcNow.AddDays(1);

        var result = BirthdayValidation.BirthdayDateValid(date);

        Assert.NotNull(result);
        Assert.Equal("The birthday date cannot be in the future", result);
    }

    [Fact]
    public void BirthdayDateValid_MoreThan120YearsAgo_ReturnStringError()
    {
        var date = DateTime.UtcNow.AddYears(-121);

        var result = BirthdayValidation.BirthdayDateValid(date);

        Assert.NotNull(result);
        Assert.Equal($"The birthday date cannot be earlier than {DateTime.UtcNow.AddYears(-120):dd/MM/yyyy}", result);
    }
}