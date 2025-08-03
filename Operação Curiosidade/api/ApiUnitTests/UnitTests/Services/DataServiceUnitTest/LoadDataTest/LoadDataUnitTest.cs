using System.Text.Json;

namespace ApiUnitTests.UnitTests.Services.DataServiceUnitTest.LoadDataTest;

public class LoadDataUnitTest : DataServiceUnitTest
{
    [Fact]
    public void LoadData_FileExists_ReturnList()
    {
        var testData = new List<int> { 1, 2, 3 };
        File.WriteAllText(_testFilePath, JsonSerializer.Serialize(testData));

        var result = _service.LoadData<int>(_testFilePath);

        Assert.Equal(testData, result);
    }

    [Fact]
    public void LoadData_FileDoesNotExist_ReturnEmptyList()
    {
        var result = _service.LoadData<int>(_testFilePath);

        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public void LoadData_EmptyFile_ReturnEmptyList()
    {
        var testData = new List<string> { };
        File.WriteAllText(_testFilePath, JsonSerializer.Serialize(testData));

        var result = _service.LoadData<int>(_testFilePath);

        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public void LoadData_FileInvalidJson_ReturnEmptyList()
    {
        File.WriteAllText(_testFilePath, "{ Invalid Json ]");

        var result = _service.LoadData<string>(_testFilePath);

        Assert.NotNull(result);
        Assert.Empty(result);
    }
}