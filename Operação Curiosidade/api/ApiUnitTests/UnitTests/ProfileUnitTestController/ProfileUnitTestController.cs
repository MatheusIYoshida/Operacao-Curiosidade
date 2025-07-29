using Moq;
using Server.Controllers;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController;

public class ProfileUnitTestController
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
