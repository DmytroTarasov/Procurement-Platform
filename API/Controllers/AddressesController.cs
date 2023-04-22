using Application.Addresses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddressesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAddresses() {
            return HandleResult(await Mediator.Send(new GetAddressesQuery()));
        }
    }
}
