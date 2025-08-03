using Microsoft.Extensions.Configuration;
using Moq;
using Server.DTOs;
using Server.Models;
using Server.Repositories;
using Server.Services;
using System.IdentityModel.Tokens.Jwt;

namespace ApiUnitTests.UnitTests.Services.TokenServiceUnitTest;

public class TokenServiceUnitTest
{
    private readonly Mock<IConfiguration> _mockConfig;
    private readonly Mock<IProfileRepository> _mockRepo;
    private readonly TokenService _tokenService;

    public TokenServiceUnitTest()
    {
        _mockConfig = new Mock<IConfiguration>();
        _mockRepo = new Mock<IProfileRepository>();

        _mockConfig.Setup(c => c["Jwt:SecretKey"]).Returns("uma-chave-secreta-longa-e-segura-1234567890");
        _mockConfig.Setup(c => c["Jwt:ValidIssuer"]).Returns("TestIssuer");
        _mockConfig.Setup(c => c["Jwt:ValidAudience"]).Returns("TestAudience");

        _tokenService = new TokenService(_mockConfig.Object, _mockRepo.Object);
    }

    [Fact]
    public void GenerateToken_ValidCredentials_ReturnValidToken()
    {
        var profile = new Profile { Name = "Test 1", Email = "test1@gmail.com", Password = "123123" };
        var profileLoginDTO = new ProfileLoginDTO { Email = "test1@gmail.com", Password = "123123" };
        var email = "test1@gmail.com";
        _mockRepo.Setup(repo => repo.GetProfile(email)).Returns(profile);

        var token = _tokenService.GenerateTokenJWT(profileLoginDTO);

        Assert.NotEmpty(token);
    }

    [Fact]
    public void GenerateToken_GetProfilesNull_ReturnEmpty()
    {
        var profileLoginDTO = new ProfileLoginDTO { Email = "test1@gmail.com", Password = "123123" };
        var email = "test1@gmail.com";
        _mockRepo.Setup(repo => repo.GetProfile(email)).Returns((Profile)null);

        var token = _tokenService.GenerateTokenJWT(profileLoginDTO);

        Assert.Empty(token);
    }

    [Fact]
    public void GenerateToken_DifferentPassawords_ReturnEmpty()
    {
        var profile = new Profile { Name = "Test 1", Email = "test1@gmail.com", Password = "456456" };
        var profileLoginDTO = new ProfileLoginDTO { Email = "test1@gmail.com", Password = "123123" };
        var email = "test1@gmail.com";
        _mockRepo.Setup(repo => repo.GetProfile(email)).Returns(profile);

        var token = _tokenService.GenerateTokenJWT(profileLoginDTO);

        Assert.Empty(token);
    }

    [Fact]
    public void GenerateToken_DifferentEmails_ReturnEmpty()
    {
        var profile = new Profile { Name = "Test 1", Email = "fake@gmail.com", Password = "123123" };
        var profileLoginDTO = new ProfileLoginDTO { Email = "test1@gmail.com", Password = "123123" };
        var email = "test1@gmail.com";
        _mockRepo.Setup(repo => repo.GetProfile(email)).Returns(profile);

        var token = _tokenService.GenerateTokenJWT(profileLoginDTO);

        Assert.Empty(token);
    }

    [Fact]
    public void GenerateTokenJWT_TokenContainsCorrectClaims()
    {
        var testProfile = new Profile { Name = "Test 1", Email = "test1@gmail.com", Password = "123123", Admin = true }; 
        var loginDto = new ProfileLoginDTO { Email = "test1@gmail.com", Password = "123123" };
        _mockRepo.Setup(r => r.GetProfile(loginDto.Email)).Returns(testProfile);

        var token = _tokenService.GenerateTokenJWT(loginDto);
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        Assert.Equal(testProfile.Name, jwtToken.Claims.First(c => c.Type == "Name").Value);
        Assert.Equal(testProfile.Email, jwtToken.Claims.First(c => c.Type == "Email").Value);
        Assert.Equal(testProfile.Admin.ToString(), jwtToken.Claims.First(c => c.Type == "Admin").Value);
    }
}
