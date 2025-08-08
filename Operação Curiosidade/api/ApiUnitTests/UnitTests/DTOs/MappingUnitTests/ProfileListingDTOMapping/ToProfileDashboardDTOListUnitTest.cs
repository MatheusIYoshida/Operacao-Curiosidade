using Server.DTOs;
using Server.DTOs.Mappings;
using Server.Models;

namespace ApiUnitTests.UnitTests.DTOs.MappingUnitTests.ProfileListingDTOMapping;

public class ToProfileDashboardDTOListUnitTest
{
    [Fact]
    public void ToProfileListingDTOList_CorrectConversion_ReturnProfileListingDTOList()
    {
        List<Profile> profiles = new List<Profile>
        {
            new Profile(),
            new Profile()
        };

        var result = profiles.ToProfileListingDTOList();

        Assert.IsType<List<ProfileListingDTO>>(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void ToProfileListingDTOList_ProfileIsNull_ReturnEmptyList()
    {
        List<Profile> profiles = null;

        var result = profiles.ToProfileListingDTOList();

        Assert.IsType<List<ProfileListingDTO>>(result);
        Assert.Equal(0, result.Count());
    }

    [Fact]
    public void ToProfileListingDTOList_ProfileIsNull_ReturnNull()
    {
        List<Profile> profiles = new List<Profile> { };

        var result = profiles.ToProfileListingDTOList();

        Assert.IsType<List<ProfileListingDTO>>(result);
        Assert.Equal(0, result.Count());
    }
}