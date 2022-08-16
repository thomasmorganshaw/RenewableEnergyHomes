using PropertySearch.Domain.Entities;
using System.Collections.Generic;

namespace RenewableEnergyHomes.Domain.Entities
{
    public class PropertySearchResult
    {
        public PropertySearchResult()
        {
            this.PropertySales = new List<PropertySale>();
        }

        public PostcodeLocation PostcodeLocation { get; set; }

        public List<PropertySale> PropertySales { get; set; }

        public List<ValidationMessage> ValidationFailures { get; set; }
    }
}
