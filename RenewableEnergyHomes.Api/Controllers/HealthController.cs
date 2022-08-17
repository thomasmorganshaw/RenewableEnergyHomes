using Microsoft.AspNetCore.Mvc;

namespace RenewableEnergyHomes.Api.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        public IActionResult Get()
        {
            return Ok(new
            {
                Status = "Healthy"
            });
        }
    }
}
