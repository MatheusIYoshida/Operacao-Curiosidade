using Server.Models;
using Server.Services;

namespace ApiUnitTests.UnitTests.Services.ProfileStatusValidationUnitTest;

public class ProfileStatusValidationUnitTest
{
    private readonly ProfileStatusValidation _service = new ProfileStatusValidation();

    [Fact]
    public void StatusValidation_StatusValid_ReturnTrue()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.True(result);
    }

    [Fact]
    public void StatusValidation_BirthdayNoValue_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = null,
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }

    [Fact]
    public void StatusValidation_AddressWhiteSpace_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }

    [Fact]
    public void StatusValidation_MoreInformationsWhiteSpace_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "test",
            MoreInformations = "",
            Interests = "test",
            Feelings = "test",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }

    [Fact]
    public void StatusValidation_InterestsWhiteSpace_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "test",
            MoreInformations = "test",
            Interests = "",
            Feelings = "test",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }

    [Fact]
    public void StatusValidation_FeelingsWhiteSpace_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "",
            CoreValues = "test"
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }

    [Fact]
    public void StatusValidation_CoreValuesWhiteSpace_ReturnFalse()
    {
        var profile = new Profile
        {
            Birthday = new DateTime(1990, 5, 15),
            Address = "test",
            MoreInformations = "test",
            Interests = "test",
            Feelings = "test",
            CoreValues = ""
        };

        var result = _service.StatusValid(profile);

        Assert.False(result);
    }
}