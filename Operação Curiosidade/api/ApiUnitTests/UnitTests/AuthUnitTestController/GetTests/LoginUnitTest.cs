using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.Controllers;
using Server.DTOs;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiUnitTests.UnitTests.AuthUnitTestController.GetTests;

public class LoginUnitTest
{
    private readonly Mock<ITokenService> _mockToken;
    private readonly AuthController _controller;

    public LoginUnitTest()
    {
        _mockToken = new Mock<ITokenService>();
        _controller = new AuthController(_mockToken.Object);
    }

    [Fact]
    public void Login_OkResult()
    {
        _mockToken.Setup(token => token.GenerateTokenJWT(It.IsAny<ProfileLoginDTO>()))
            .Returns("token");

        var result = _controller.Login(It.IsAny<ProfileLoginDTO>());

        var okResult = Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public void Login_UnauthorizedResult()
    {
        _mockToken.Setup(token => token.GenerateTokenJWT(It.IsAny<ProfileLoginDTO>()))
            .Returns("");

        var result = _controller.Login(It.IsAny<ProfileLoginDTO>());

        var okResult = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal("Incorrect email or password", okResult.Value);
    }
}
