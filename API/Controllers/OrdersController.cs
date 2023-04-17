using Application.Orders;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateOrderCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
