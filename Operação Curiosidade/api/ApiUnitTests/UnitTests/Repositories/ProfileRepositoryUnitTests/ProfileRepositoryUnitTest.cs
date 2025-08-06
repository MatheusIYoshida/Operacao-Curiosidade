using Moq;
using Server.Models;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;

namespace ApiUnitTests.UnitTests.Repositories.ProfileRepositoryUnitTests;

public class ProfileRepositoryUnitTest
{
    protected readonly Mock<IEmailValidation> _mockEmailValidation;
    protected readonly Mock<IProfileStatusVerification> _mockStatusValidation;
    protected readonly Mock<IDataService> _mockDataService;
    protected readonly Mock<IPaginationHelper> _mockPaginationHelper;
    protected readonly ProfileRepository _repository;
    protected readonly List<Profile> listProfiles = new List<Profile> 
    { 
        new Profile {Name = "test", Email = "test@gmail.com", Password = "123123", Deleted = false},
        new Profile {Name = "test2", Email = "test2@gmail.com", Password = "123123", Deleted = true},
        new Profile {Name = "test3", Email = "test3@gmail.com", Password = "123123", Deleted = false}
    };

    public ProfileRepositoryUnitTest()
    {
        _mockEmailValidation = new Mock<IEmailValidation>();
        _mockStatusValidation = new Mock<IProfileStatusVerification>();
        _mockDataService = new Mock<IDataService>();
        _mockPaginationHelper = new Mock<IPaginationHelper>();

        _mockDataService.Setup(mock => mock.LoadData<Profile>(It.IsAny<string>())).Returns(listProfiles);

        _repository = new ProfileRepository(_mockEmailValidation.Object, _mockStatusValidation.Object, 
            _mockDataService.Object, _mockPaginationHelper.Object);
    }
}