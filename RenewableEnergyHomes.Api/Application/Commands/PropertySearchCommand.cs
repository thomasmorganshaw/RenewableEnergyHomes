namespace RenewableEnergyHomes.Api.Application.Commands
{
    public class PropertySearchCommand
    {
        public PropertySearchCommand(string postcode)
        {
            _postcode = postcode;
        }

        private string _postcode;

        public void Sanitize()
        {
            _postcode = _postcode.Replace(" ", "");
        }

        public string Postcode => _postcode;
    }
}
