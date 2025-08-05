namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Delete;

public class DeleteProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void DeleteProfile_ReturnTrue()
    {
        var email = "test3@gmail.com";

        var result = _repository.DeleteProfile(email);

        Assert.True(result);
        Assert.Equal(1, _repository.GetProfiles().Count());
    }

    [Fact]
    public void DeleteProfile_ProfileAlreadyDeleted_ReturnFalse()
    {
        var email = "test2@gmail.com";

        var result = _repository.DeleteProfile(email);

        Assert.False(result);
        Assert.Equal(2, _repository.GetProfiles().Count());
    }

    [Fact]
    public void DeleteProfile_EmailDoesNotExist_ReturnFalse()
    {
        var email = "fake3@gmail.com";

        var result = _repository.DeleteProfile(email);

        Assert.False(result);
        Assert.Equal(2, _repository.GetProfiles().Count());
    }
}