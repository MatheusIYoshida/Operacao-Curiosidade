using Server.Repositories;
using Moq;
using Server.Controllers;
using Server.Models;

namespace ApiUnitTests.UnitTests.Controllers.LogUnitTestController;

public abstract class LogUnitTestController
{
    protected readonly Mock<ILogRepository> _mockRepo;
    protected readonly LogController _controller;

    protected readonly List<Log> _testLogs = new()
    {
        new Log { Name = "Test 1", Email = "test1@gmail.com", Action = "testing" },
        new Log { Name = "Test 2", Email = "test2@gmail.com", Action = "Editing" },
        new Log { Name = "Test 3", Email = "test3@gmail.com", Action = "testing" }
    };

    protected LogUnitTestController()
    {
        _mockRepo = new Mock<ILogRepository>();
        _controller = new LogController(_mockRepo.Object);
    }
}