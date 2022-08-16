using RenewableEnergyHomes.Domain.Entities;
using RenewableEnergyHomes.Domain.Services;
using RenewableEnergyHomes.Infrastructure.Dtos;
using Serilog;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace RenewableEnergyHomes.Infrastructure.Services
{
    public class PostcodeService : IPostcodeService
    {
        private readonly HttpClient _httpClient;

        public PostcodeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<PostcodeLocation> GetPostcodeLocationAsync(string postcode)
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<PostcodeLocationResponseModel>($"postcodes/{postcode}");
                if (response.Status != 200)
                {
                    Log.Error("Postcode.io response status not ok {@response}", response);
                    return new PostcodeLocation();
                }

                var result = new PostcodeLocation
                {
                    Postcode = response.Result.Postcode,
                    Latitude = response.Result.Latitude,
                    Longitude = response.Result.Longitude
                };

                Log.Information("PostcodeService result {@result}", result);
                return result;

            }
            catch (HttpRequestException httpRequestException)
            {
                Log.Error("Postcode.io error {@httpRequestException}", httpRequestException);
                return new PostcodeLocation();
            }
        }
    }
}
