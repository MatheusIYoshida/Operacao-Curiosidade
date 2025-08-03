using System.Text.Json;

namespace ApiUnitTests.UnitTests.Services.DataServiceUnitTest.SaveDataTest;

public class SaveDataUnitTest : DataServiceUnitTest
{
    [Fact]
    public void SaveData_ValidData()
    {
        var testData = new List<int> { 1, 2, 3 };

        _service.SaveData(_testFilePath, testData);

        var fileContent = File.ReadAllText(_testFilePath);
        var deserialized = JsonSerializer.Deserialize<List<int>>(fileContent);
        Assert.Equal(testData, deserialized);
    }

    [Fact]
    public void SaveData_DirectoryDoesNotExist_CreateDirectory()
    {
        var newDir = Path.Combine(Path.GetTempPath(), "newDirectory");
        var dirPath = Path.Combine(newDir, "test.json");
        var testData = new List<int> { 1, 2, 3 };

        try
        {
            _service.SaveData(dirPath, testData);

            Assert.True(Directory.Exists(newDir));
            Assert.True(File.Exists(dirPath));
        }
        finally
        {
            if (Directory.Exists(newDir))
            {
                Directory.Delete(newDir, true);
            }
        }
    }

    [Fact]
    public void SaveData_EmptyFile()
    {
        var testData = new List<int> { };

        _service.SaveData(_testFilePath, testData);

        var fileContent = File.ReadAllText(_testFilePath);
        var deserialized = JsonSerializer.Deserialize<List<int>>(fileContent);
        Assert.Empty(deserialized);
    }
}
