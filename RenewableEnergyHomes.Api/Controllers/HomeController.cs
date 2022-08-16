using Microsoft.AspNetCore.Mvc;

namespace RenewableEnergyHomes.Api.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
