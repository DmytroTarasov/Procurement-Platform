using API.Extensions;
using Application.Common.Helpers;
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
        
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] OrdersParams ordersParams) {
            var ordersResult = await Mediator.Send(new GetOrdersQuery { OrdersParams = ordersParams });
            var orders = ordersResult.Value;
            Response.AddPaginationHeader(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages);
            return HandleResult(ordersResult);
        }
    }
}