using API.Helpers;
using Application.Addresses;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddressesController : BaseApiController
    {
        [AuthorizeRoles(UserRoles.Customer, UserRoles.Supplier)]
        [HttpGet]
        public async Task<IActionResult> GetAddresses() {
            return HandleResult(await Mediator.Send(new GetAddressesQuery()));
        }
    }
}
