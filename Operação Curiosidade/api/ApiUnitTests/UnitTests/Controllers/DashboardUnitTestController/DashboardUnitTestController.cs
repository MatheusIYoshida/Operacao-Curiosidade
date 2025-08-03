using Moq;
using Server.Controllers;
using Server.Models;
using Server.Repositories;

namespace ApiUnitTests.UnitTests.Controllers.DashboardUnitTestController;

public abstract class DashboardUnitTestController
{
    protected readonly Mock<IProfileRepository> _mockRepo;
    protected readonly DashboardController _controller;

    protected readonly List<Profile> _testProfiles = Enumerable.Range(1, 16)
        .Select(i => new Profile
        {
            Name = $"Test {i}",
            Email = $"test{i}@example.com",
            Password = "123123",
            Status = i % 2 == 0 ? "Complete" : "Incomplete",
            CreatedAt = DateTime.UtcNow.AddDays(-(i % 2 == 0 ? 29 : 31))
        }).ToList();

    protected DashboardUnitTestController()
    {
        _mockRepo = new Mock<IProfileRepository>();
        _controller = new DashboardController(_mockRepo.Object); 
    }
}
