using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RenewableEnergyHomes.Api.Application.CommandHandlers;
using RenewableEnergyHomes.Api.Infrastructure;
using RenewableEnergyHomes.Domain.Repositories;
using RenewableEnergyHomes.Domain.Services;
using RenewableEnergyHomes.Infrastructure.Repositories;
using RenewableEnergyHomes.Infrastructure.Services;
using System;

namespace RenewableEnergyHomes.Api
{
    public static class DependencyInjection
    {
        internal static void AddPropertyLookupServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("PropertyData");
            services.AddScoped<IPropertyRepo>(x => new PropertyRepo(connectionString));

            services.AddHttpClient<IPostcodeService, PostcodeService>(client =>
            {
                client.BaseAddress = new Uri(configuration["ConnectedServices:PostcodesService"]);
            });

            services.AddScoped<IPropertySearchHandler, PropertySearchHandler>();
        }
    }
}
