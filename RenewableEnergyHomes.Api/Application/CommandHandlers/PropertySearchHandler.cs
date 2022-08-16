using Serilog;
using RenewableEnergyHomes.Api.Application.Commands;
using RenewableEnergyHomes.Api.Infrastructure;
using RenewableEnergyHomes.Domain.Entities;
using RenewableEnergyHomes.Domain.Repositories;
using RenewableEnergyHomes.Domain.Services;
using System.Threading.Tasks;
using PropertySearch.Api.Extensions;

namespace RenewableEnergyHomes.Api.Application.CommandHandlers
{
    public class PropertySearchHandler : IPropertySearchHandler
    {
        private readonly IPostcodeService _postcodeService;
        private readonly IPropertyRepo _propertyRepo;

        public PropertySearchHandler(
            IPostcodeService postcodeService,
            IPropertyRepo propertyRepo)
        {
            _postcodeService = postcodeService;
            _propertyRepo = propertyRepo;
        }

        public async Task<PropertySearchResult> PropertySearchAsync(PropertySearchCommand request)
        {
            Log.Information("Request {@request}", request);

            if (!request.ValidateCommand(out var messages))
            {
                Log.Warning("Validation failed {@messages}", messages);
                return new PropertySearchResult { ValidationFailures = messages };
            }

            var result = new PropertySearchResult
            {
                PostcodeLocation = await _postcodeService.GetPostcodeLocationAsync(request.Postcode),
                PropertySales = await _propertyRepo.PropertySalesByPostcodeAsync(request.Postcode)
            };

            Log.Information("Result {@result}", result);
            return result;
        }
    }
}
