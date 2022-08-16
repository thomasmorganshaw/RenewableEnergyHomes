using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using RenewableEnergyHomes.Domain.Repositories;
using RenewableEnergyHomes.Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using Serilog;

namespace RenewableEnergyHomes.Infrastructure.Repositories
{
    public class PropertyRepo : IPropertyRepo
    {
        private readonly string _connectionString;

        public PropertyRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<PropertySale>> PropertySalesByPostcodeAsync(string postcode)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var propertySalesResult = await connection
                    .QueryAsync<PropertySale>(
                        "dbo.PropertySalesByPostcode",
                        new { Postcode = postcode },
                        commandType: CommandType.StoredProcedure);

                Log.Information("PropertySalesResult {@propertySalesResult}", propertySalesResult);
                return propertySalesResult.ToList();
            }
        }
    }
}
