using Application.Goods;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoodsController : BaseApiController
    { 
        [HttpGet]
        public async Task<IActionResult> GetGoods() {
            return HandleResult(await Mediator.Send(new GetGoodsQuery()));
        }        
    }
}
