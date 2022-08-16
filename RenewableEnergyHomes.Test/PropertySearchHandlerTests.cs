using Xunit;
using System.Threading.Tasks;
using Moq;
using RenewableEnergyHomes.Api.Application.CommandHandlers;
using RenewableEnergyHomes.Api.Application.Commands;
using RenewableEnergyHomes.Domain.Repositories;
using RenewableEnergyHomes.Domain.Services;
using RenewableEnergyHomes.Domain.Entities;
using System.Collections.Generic;

namespace RenewableEnergyHomes.Test
{
    public class PropertySearchHandlerTests
    {
        private readonly Mock<IPostcodeService> _mockPostcodeService;
        private readonly Mock<IPropertyRepo> _mockPropertyRepo;

        public PropertySearchHandlerTests()
        {
            _mockPostcodeService = new Mock<IPostcodeService>();
            _mockPropertyRepo = new Mock<IPropertyRepo>();
        }

        [Fact]
        public async Task SearchHandler_Returns_CombinedSearchResult()
        {
            const string Postcode = "CO38WR";

            // ARRANGE
            _mockPostcodeService
                .Setup(x => x.GetPostcodeLocationAsync(It.IsAny<string>()))
                .ReturnsAsync(new PostcodeLocation
                {
                    Postcode = Postcode
                });

            _mockPropertyRepo
                .Setup(x => x.PropertySalesByPostcodeAsync(It.IsAny<string>()))
                .ReturnsAsync(new List<PropertySale> {
                    new PropertySale { Id = 1, Postcode = Postcode },
                    new PropertySale { Id = 2, Postcode = Postcode }

                });

            var sut = new PropertySearchHandler(_mockPostcodeService.Object, _mockPropertyRepo.Object);

            // ACT
            var result = await sut.PropertySearchAsync(new PropertySearchCommand(Postcode));

            // ASSERT
            Assert.NotNull(result.PostcodeLocation);
            Assert.True(result.PostcodeLocation.Postcode == Postcode);

            Assert.NotNull(result.PropertySales);
            Assert.Contains(result.PropertySales, x => x.Postcode == Postcode);
        }

        [Fact]
        public async Task BadPostcode_Returns_ValidationFailures()
        {
            // ARRANGE
            var sut = new PropertySearchHandler(_mockPostcodeService.Object, _mockPropertyRepo.Object);

            // ACT
            var result = await sut.PropertySearchAsync(new PropertySearchCommand("CM120P"));

            // ASSERT
            Assert.Null(result.PostcodeLocation);
            Assert.Empty(result.PropertySales);
            Assert.NotNull(result.ValidationFailures);
            Assert.Contains(result.ValidationFailures, x => x.Field == "Postcode");
        }

        [Fact]
        public async Task GoodPostcode_Returns_SearchResults()
        {
            // ARRANGE
            _mockPostcodeService
                .Setup(x => x.GetPostcodeLocationAsync(It.IsAny<string>()))
                .ReturnsAsync(new PostcodeLocation{});

            _mockPropertyRepo
                .Setup(x => x.PropertySalesByPostcodeAsync(It.IsAny<string>()))
                .ReturnsAsync(new List<PropertySale> { new PropertySale { Id = 1 } });

            // ARRANGE
            var sut = new PropertySearchHandler(_mockPostcodeService.Object, _mockPropertyRepo.Object);

            // ACT
            var result = await sut.PropertySearchAsync(new PropertySearchCommand("CO38WR"));

            // ASSERT
            Assert.NotNull(result.PostcodeLocation);
            Assert.NotEmpty(result.PropertySales);
            Assert.Null(result.ValidationFailures);
            Assert.Null(result.ValidationFailures);
        }
    }
}
