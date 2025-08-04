using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests;

public class ToProfileDTOListUnitTest
{
    [Fact]
    public void ToProfileDTOList_CorrectConversion_ReturnProfileDTOList()
    {
        List<Profile> profiles = new List<Profile>
        {
            new Profile(),
            new Profile()
        };

        var result = profiles.ToProfileDTOList();

        Assert.IsType<List<ProfileDTO>>(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void ToProfileDTOList_ProfileIsNull_ReturnEmptyList()
    {
        List<Profile> profiles = null;

        var result = profiles.ToProfileDTOList();

        Assert.IsType<List<ProfileDTO>>(result);
        Assert.Equal(0, result.Count());
    }

    [Fact]
    public void ToProfileDTOList_ProfileIsNull_ReturnNull()
    {
        List<Profile> profiles = new List<Profile> { };

        var result = profiles.ToProfileDTOList();

        Assert.IsType<List<ProfileDTO>>(result);
        Assert.Equal(0, result.Count());
    }
}
