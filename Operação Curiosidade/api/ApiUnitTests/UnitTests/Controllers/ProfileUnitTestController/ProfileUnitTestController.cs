using Moq;
using Server.Controllers;
using Server.Models;
using Server.Repositories;

namespace ApiUnitTests.UnitTests.Controllers.ProfileUnitTestController;

public abstract class ProfileUnitTestController
{
    protected readonly Mock<IProfileRepository> _mockRepo;
    protected readonly ProfileController _controller;

    protected readonly List<Profile> _testProfiles = new()
    {
        new Profile { Name = "Test 1", Email = "test1@example.com", Password = "123123" },
        new Profile { Name = "Test 2", Email = "test2@example.com", Password = "456456" },
        new Profile { Name = "Test 3", Email = "test3@example.com", Password = "789789" }
    };

    protected ProfileUnitTestController()
    {
        _mockRepo = new Mock<IProfileRepository>();
        _controller = new ProfileController(_mockRepo.Object);
    }
}