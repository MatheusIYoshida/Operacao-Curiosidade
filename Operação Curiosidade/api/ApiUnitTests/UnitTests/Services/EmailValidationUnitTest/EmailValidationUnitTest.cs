using Server.Models;
using Server.Services;

namespace ApiUnitTests.UnitTests.Services.EmailValidationUnitTest;

public class EmailValidationUnitTest
{
    private readonly EmailValidation _service = new EmailValidation();
    private readonly List<Profile> _listProfile = new()
    { 
        new Profile { Name = "Test 1", Email = "test1@gmail.com", Deleted = false },
        new Profile { Name = "Test 2", Email = "test2@gmail.com", Deleted = true },
        new Profile { Name = "Test 3", Email = "test3@gmail.com", Deleted = false }
    };

    [Fact]
    public void EmailValidation_EmailExist_ReturnTrue()
    {
        var testEmail = "test1@gmail.com";

        var result = _service.EmailAlreadyExist(testEmail, _listProfile);

        Assert.True(result);
    }

    [Fact]
    public void EmailValidation_EmailDoesNotExist_ReturnFalse()
    {
        var testEmail = "fake@gmail.com";

        var result = _service.EmailAlreadyExist(testEmail, _listProfile);

        Assert.False(result);
    }

    [Fact]
    public void EmailValidation_EmailExistIsDeleted_ReturnFalse()
    {
        var testEmail = "test2@gmail.com";

        var result = _service.EmailAlreadyExist(testEmail, _listProfile);

        Assert.False(result);
    }
}
