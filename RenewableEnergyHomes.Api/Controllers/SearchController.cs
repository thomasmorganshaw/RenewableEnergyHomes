using Microsoft.AspNetCore.Mvc;
using RenewableEnergyHomes.Api.Application.Commands;
using RenewableEnergyHomes.Api.Infrastructure;
using System.Threading.Tasks;

namespace RenewableEnergyHomes.Api.Controllers
{
    [Route("api/property")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IPropertySearchHandler _propertyLookupService;

        public SearchController(IPropertySearchHandler propertyLookupService)
        {
            _propertyLookupService = propertyLookupService;
        }

        [HttpGet("search/{postcode}")]
        public async Task<IActionResult> PropertySearch(string postcode)
        {
            return Ok(await _propertyLookupService.PropertySearchAsync(new PropertySearchCommand(postcode)));
        }
    }
}
