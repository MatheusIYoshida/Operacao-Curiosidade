using Server.Models;
using Server.Validations;
using Server.Validations.ProfileValidations;

namespace ApiUnitTests.UnitTests.Validations.FieldsValidations.EmailValidationsUnitTest;

public class EmailAlreadyExistUnitTest
{
    private readonly List<Profile> list = new List<Profile>()
    {
        new Profile() { Name = "fakeOne", Email = "test1@gmail.com", Password = "123123", Deleted = false },
        new Profile() { Name = "fakeTwo", Email = "test2@gmail.com", Password = "123123", Deleted = true },
        new Profile() { Name = "fakeThree", Email = "test3@gmail.com", Password = "123123", Deleted = false }
    };

    [Fact]
    public void EmailAlreadyExist_NotExist_ReturnNull()
    {
        var email = "email@email.com";

        var result = EmailValidations.EmailAlreadyExist(email, list);

        Assert.Null(result);
    }

    [Fact]
    public void EmailAlreadyExist_Exist_ReturnStringError()
    {
        var email = "test1@gmail.com";

        var result = EmailValidations.EmailAlreadyExist(email, list);

        Assert.NotNull(result);
        Assert.Equal("Email already exists", result);
    }

    [Fact]
    public void EmailAlreadyExist_ExistButIsDeleted_ReturnNull()
    {
        var email = "test2@gmail.com";

        var result = EmailValidations.EmailAlreadyExist(email, list);

        Assert.Null(result);
    }
}
