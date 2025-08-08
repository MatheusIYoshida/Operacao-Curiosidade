using Moq;
using Server.Models;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Delete;

public class DeleteProfileUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void DeleteProfile_ReturnTrue()
    {
        List<Profile> list = new List<Profile>
        {
            new Profile {Name = "test", Email = "test@gmail.com", Password = "123123", Deleted = false},
            new Profile {Name = "test2", Email = "test2@gmail.com", Password = "123123", Deleted = true},
            new Profile {Name = "test3", Email = "test3@gmail.com", Password = "123123", Deleted = false}
        };
        var email = "test3@gmail.com";
        var mockDataService = new Mock<IDataService>();
        mockDataService.Setup(mock => mock.LoadData<Profile>(It.IsAny<string>())).Returns(list);
        var repository = new ProfileRepository(_mockStatusValidation.Object,
            mockDataService.Object, _mockPaginationHelper.Object);

        var result = _repository.DeleteProfile(email);

        Assert.True(result);
        Assert.Equal(1, _repository.GetProfiles().Count());
    }

    [Fact]
    public void DeleteProfile_ProfileAlreadyDeleted_ReturnFalse()
    {
        List<Profile> list = new List<Profile>
        {
            new Profile {Name = "test", Email = "test@gmail.com", Password = "123123", Deleted = false},
            new Profile {Name = "test2", Email = "test2@gmail.com", Password = "123123", Deleted = true},
            new Profile {Name = "test3", Email = "test3@gmail.com", Password = "123123", Deleted = false}
        };
        var mockDataService = new Mock<IDataService>();
        var mockStatusValidation = new Mock<IProfileStatusVerification>();
        var mockPaginationHelper = new Mock<IPaginationHelper>();
        mockDataService.Setup(mock => mock.LoadData<Profile>(It.IsAny<string>())).Returns(list);
        ProfileRepository repository = new ProfileRepository(mockStatusValidation.Object,
            mockDataService.Object, mockPaginationHelper.Object);
        var email = "test2@gmail.com";

        var result = repository.DeleteProfile(email);

        Assert.False(result);
        Assert.Equal(2, repository.GetProfiles().Count());
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