using RenewableEnergyHomes.Api.Application.Commands;
using PropertySearch.Domain.Entities;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace PropertySearch.Api.Extensions
{
    public static class ValidationExtensions
    {
        public static bool ValidateCommand(this PropertySearchCommand request, out List<ValidationMessage> messages)
        {
            request.Sanitize();

            var match = Regex.Match(
                request.Postcode,
                "(GIR 0AA)|((([A-Z-[QVX]][0-9][0-9]?)|(([A-Z-[QVX]][A-Z-[IJZ]][0-9][0-9]?)|(([A-Z-[QVX]][0-9][A-HJKSTUW])|([A-Z-[QVX]][A-Z-[IJZ]][0-9][ABEHMNPRVWXY]))))[0-9][A-Z-[CIKMOV]]{2})",
                RegexOptions.IgnoreCase);

            messages = match.Success
                ? null
                : new List<ValidationMessage>
                {
                    new ValidationMessage
                    {
                        Field = "Postcode",
                        Message = "Value was not in the expected UK postcode format."
                    }
                };

            return match.Success;
        }
    }
}
