using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests.ProfileReportsDTOMapping;

public class ToProfileReportsDTOListUnitTest
{
    [Fact]
    public void ToProfileReportsDTOList_CorrectConversion_ReturnProfileReportsDTOList()
    {
        List<Profile> profiles = new List<Profile>
        {
            new Profile(),
            new Profile()
        };

        var result = profiles.ToProfileReportsDTOList();
        
        Assert.IsType<List<ProfileReportsDTO>>(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void ToProfileReportsDTOList_ProfileIsNull_ReturnEmptyList()
    {
        List<Profile> profiles = null;

        var result = profiles.ToProfileReportsDTOList();

        Assert.IsType<List<ProfileReportsDTO>>(result);
        Assert.Equal(0, result.Count());
    }

    [Fact]
    public void ToProfileReportsDTOList_ProfileIsNull_ReturnNull()
    {
        List<Profile> profiles = new List<Profile> { };

        var result = profiles.ToProfileReportsDTOList();

        Assert.IsType<List<ProfileReportsDTO>>(result);
        Assert.Equal(0, result.Count());
    }
}