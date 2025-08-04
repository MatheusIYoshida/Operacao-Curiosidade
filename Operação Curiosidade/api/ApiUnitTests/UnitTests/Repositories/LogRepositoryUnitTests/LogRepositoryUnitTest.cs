using Moq;
using Server.Models;
using Server.Pagination;
using Server.Repositories;
using Server.Services.Interfaces;

namespace ApiUnitTests.UnitTests.Repositories.LogRepositoryUnitTests;

public class LogRepositoryUnitTest
{
    protected readonly Mock<IDataService> _mockDataService;
    protected readonly Mock<IPaginationHelper> _mockPagination;
    protected readonly LogRepository _repository;
    protected readonly List<Log> listLogs = new List<Log>
    {
        new Log {Name = "test", Email = "test@gmail.com", Action = "Create", CreatedAt = DateTime.UtcNow },
        new Log {Name = "test2", Email = "test2@gmail.com", Action = "Remove", CreatedAt = DateTime.UtcNow },
        new Log {Name = "test3", Email = "test3@gmail.com", Action = "Edit", CreatedAt = DateTime.UtcNow }
    };

    public LogRepositoryUnitTest()
    {
        _mockDataService = new Mock<IDataService>();
        _mockPagination = new Mock<IPaginationHelper>();

        _mockDataService.Setup(mock => mock.LoadData<Log>(It.IsAny<string>())).Returns(listLogs);

        _repository = new LogRepository(_mockDataService.Object, _mockPagination.Object );
    }
}
