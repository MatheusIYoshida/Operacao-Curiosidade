using Server.Services;
using System.Text.Json;

namespace ApiUnitTests.UnitTests.Services.DataServiceUnitTest.LoadDataTest;

public class LoadDataUnitTest
{
    [Fact]
    public void LoadData_FileExists_ReturnList()
    {
        var tempFile = Path.GetTempFileName();
        try
        {
            var testData = new List<int> { 1, 2, 3 };
            File.WriteAllText(tempFile, JsonSerializer.Serialize(testData));
            var service = new DataService();

            var result = service.LoadData<int>(tempFile);

            Assert.Equal(testData, result);
        }
        finally
        {
            if (File.Exists(tempFile))
            {
                File.Delete(tempFile);
            }
        }
    }

    [Fact]
    public void LoadData_FileDoesNotExist_ReturnEmptyList()
    {
        var tempFile = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".json");

        var service = new DataService();

        var result = service.LoadData<int>(tempFile);

        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public void LoadData_EmptyFile_ReturnEmptyList()
    {
        var tempFile = Path.GetTempFileName();
        try
        {
            var service = new DataService();

            var result = service.LoadData<int>(tempFile);

            Assert.NotNull(result);
            Assert.Empty(result);
        }
        finally
        {
            if (File.Exists(tempFile))
            {
                File.Delete(tempFile);
            }
        }
    }

    [Fact]
    public void LoadData_FileInvalidJson_ReturnEmptyList()
    {
        var tempFile = Path.GetTempFileName();
        try
        {
            File.WriteAllText(tempFile, "{ Invalid Json ]");
            var service = new DataService();

            var result = service.LoadData<string>(tempFile);

            Assert.NotNull(result);
            Assert.Empty(result);
        }
        finally
        {
            if (File.Exists(tempFile))
            {
                File.Delete(tempFile);
            }
        }
    }
}