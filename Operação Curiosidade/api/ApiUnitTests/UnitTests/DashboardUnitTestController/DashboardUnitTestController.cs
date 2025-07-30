using Moq;
using Server.Controllers;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.DashboardUnitTestController;

public class DashboardUnitTestController
{
    protected readonly Mock<IProfileRepository> _mockRepo;
    protected readonly DashboardController _controller;

    protected readonly List<Profile> _testProfiles = new()
    {
        new Profile { Name = "Test 1", Email = "test1@example.com", Password = "123123", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 2", Email = "test2@example.com", Password = "456456", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 3", Email = "test3@example.com", Password = "789789", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 4", Email = "test4@example.com", Password = "123123", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 5", Email = "test5@example.com", Password = "456456", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 6", Email = "test6@example.com", Password = "789789", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 7", Email = "test7@example.com", Password = "123123", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 8", Email = "test8@example.com", Password = "456456", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-31)  },
        new Profile { Name = "Test 9", Email = "test9@example.com", Password = "789789", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 10", Email = "test10@example.com", Password = "123123", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 11", Email = "test11@example.com", Password = "456456", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-29) },
        new Profile { Name = "Test 12", Email = "test12@example.com", Password = "789789", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 13", Email = "test13@example.com", Password = "123123", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 14", Email = "test14@example.com", Password = "456456", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 15", Email = "test15@example.com", Password = "789789", Status = "Incomplete", CreatedAt = DateTime.UtcNow.AddDays(-31) },
        new Profile { Name = "Test 16", Email = "test16@example.com", Password = "789789", Status = "Complete", CreatedAt = DateTime.UtcNow.AddDays(-31) }
    };

    protected DashboardUnitTestController()
    {
        _mockRepo = new Mock<IProfileRepository>();
        _controller = new DashboardController(_mockRepo.Object); 
    }
}
