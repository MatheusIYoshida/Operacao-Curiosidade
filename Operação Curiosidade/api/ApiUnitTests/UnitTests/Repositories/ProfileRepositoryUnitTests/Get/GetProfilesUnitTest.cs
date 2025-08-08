using Moq;
using Server.Models;
using Server.Repositories;
using Server.Services.Interfaces;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests.Get;

public class GetProfilesUnitTest : ProfileRepositoryUnitTest
{
    [Fact]
    public void GetProfiles_ReturnProfiles()
    {
        var result = _repository.GetProfiles();

        Assert.IsType<List<Profile>>(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void GetProfiles_EmptyList_ReturnEmptyList()
    {
        var mockDataService = new Mock<IDataService>();
        mockDataService.Setup(mock => mock.LoadData<Profile>(It.IsAny<string>())).Returns(new List<Profile>());
        ProfileRepository _repository = new ProfileRepository(_mockStatusValidation.Object,
            mockDataService.Object, _mockPaginationHelper.Object);

        var result = _repository.GetProfiles();

        Assert.IsType<List<Profile>>(result);
        Assert.Equal(0, result.Count());
    }
}