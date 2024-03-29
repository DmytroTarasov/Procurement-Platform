using API.Extensions;
using API.Helpers;
using Application.Common.Helpers;
using Application.Orders;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {   
        [AuthorizeRoles(UserRoles.Customer)]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
        
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] OrdersParams ordersParams) {
            var ordersResult = await Mediator.Send(new GetOrdersQuery { OrdersParams = ordersParams });
            var orders = ordersResult.Value;
            Response.AddPaginationHeader(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages);
            return HandleResult(ordersResult);
        }
        
        [AuthorizeRoles(UserRoles.Customer)]
        [HttpPatch("{id}/cancel")]
        public async Task<IActionResult> CancelOrder(int id) {
            return HandleResult(await Mediator.Send(new CancelOrderCommand { Id = id }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetails(int id) {
            return HandleResult(await Mediator.Send(new GetOrderDetailsQuery { Id = id }));
        }
    }
}
