using RenewableEnergyHomes.Domain.Entities;
using System.Threading.Tasks;

namespace RenewableEnergyHomes.Domain.Services
{
    public interface IPostcodeService
    {
        Task<PostcodeLocation> GetPostcodeLocationAsync(string postcode);
    }
}
