using Server.Models;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Get;

public class GetProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void GetProfile_ProfileExist_ReturnProfile()
    {
        var email = "test3@gmail.com";

        var result = _repository.GetProfile(email);

        Assert.IsType<Profile>(result);
        Assert.Equal(email, result.Email);
    }

    [Fact]
    public void GetProfile_ProfileExist_IsDeleted_ReturnNull()
    {
        var email = "test2@gmail.com";

        var result = _repository.GetProfile(email);

        Assert.Null(result);
    }

    [Fact]
    public void GetProfile_ProfileNotExist_ReturnNull()
    {
        var email = "fake@gmail.com";

        var result = _repository.GetProfile(email);

        Assert.Null(result);
    }
}