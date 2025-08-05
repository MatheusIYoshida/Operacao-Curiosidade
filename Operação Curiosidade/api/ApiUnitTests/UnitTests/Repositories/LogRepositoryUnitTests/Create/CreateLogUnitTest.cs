using Server.Models;

namespace ApiUnitTests.UnitTests.Repositories.LogRepositoryUnitTests.Create;

public class CreateLogUnitTest : LogRepositoryUnitTest
{
    [Fact]
    public void CreateLog_ReturnLog()
    {
        Log log = new Log { Name = "test", Email = "test@gmail.com", Action = "remove", CreatedAt = DateTime.UtcNow };

        var result = _repository.CreateLog(log);

        Assert.IsType<Log>(result);
        Assert.Equal(log.Name, result.Name);
        Assert.Equal(log.Email, result.Email);
        Assert.Equal(log.Action, result.Action);
        Assert.Equal(log.CreatedAt, result.CreatedAt);
    }
}