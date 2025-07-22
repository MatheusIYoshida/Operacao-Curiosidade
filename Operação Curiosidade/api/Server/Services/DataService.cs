using Server.Services.Interfaces;
using System.Collections.Generic;
using System.Text.Json;

namespace Server.Services;

public class DataService : IDataService
{
    public List<T> LoadData<T>(string filePath)
    {
        if (!File.Exists(filePath) || new FileInfo(filePath).Length == 0)
            return new List<T>();

        var json = File.ReadAllText(filePath);
        var result = JsonSerializer.Deserialize<List<T>>(json);
        if(result == null)
            return new List<T>();
        return result;
    }

    public void SaveData<T>(string filePath, List<T> data)
    {
        var directory = Path.GetDirectoryName(filePath);
        if(!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            Directory.CreateDirectory(directory);

        var json = JsonSerializer.Serialize(data);
        File.WriteAllText(filePath, json);
    }
}
