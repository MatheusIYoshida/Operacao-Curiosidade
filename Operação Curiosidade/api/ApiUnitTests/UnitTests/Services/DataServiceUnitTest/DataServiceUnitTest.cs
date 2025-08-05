using Server.Services;

namespace ApiUnitTests.UnitTests.Services.DataServiceUnitTest;

public abstract class DataServiceUnitTest : IDisposable
{
    protected readonly string _testFilePath = Path.Combine(Path.GetTempPath(), "testData.json");
    protected readonly DataService _service = new DataService();
    
    public void Dispose()
    {
        if (File.Exists(_testFilePath))
        {
            File.Delete(_testFilePath);
        }        
    }
}