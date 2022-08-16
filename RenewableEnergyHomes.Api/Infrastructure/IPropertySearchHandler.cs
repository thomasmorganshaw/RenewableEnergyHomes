using RenewableEnergyHomes.Api.Application.Commands;
using RenewableEnergyHomes.Domain.Entities;
using System.Threading.Tasks;

namespace RenewableEnergyHomes.Api.Infrastructure
{
    public interface IPropertySearchHandler
    {
        Task<PropertySearchResult> PropertySearchAsync(PropertySearchCommand request);
    }
}
