using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.ProfileUnitTestController.GetTests
{
    public class GetAllUnitTest : ProfileUnitTestController
    {
        [Fact]
        public void GetAll_OKResult_ReturnListProfile()
        {
            _mockRepo.Setup(repo => repo.GetProfiles()).Returns(_testProfiles);

            var result = _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);
            var returnValue = Assert.IsType<List<ProfileDTO>>(okResult.Value);
            Assert.Equal(3, returnValue.Count());
        }

        [Fact]
        public void GetAll_ReturnEmptyList()
        {
            _mockRepo.Setup(repo => repo.GetProfiles()).Returns(new List<Profile>());

            var result = _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultValue = Assert.IsType<List<ProfileDTO>>(okResult.Value);
            Assert.Empty(resultValue);
        }
    }
}
