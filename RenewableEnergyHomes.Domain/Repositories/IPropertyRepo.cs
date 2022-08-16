using RenewableEnergyHomes.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RenewableEnergyHomes.Domain.Repositories
{
    public interface IPropertyRepo
    {
        Task<List<PropertySale>> PropertySalesByPostcodeAsync(string postcode);
    }
}
