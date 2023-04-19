using Application.Goods;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoodsController : BaseApiController
    { 
        [HttpGet]
        public async Task<IActionResult> GetGoods([FromQuery] string categoryTitle) {
            return HandleResult(await Mediator.Send(new GetGoodsQuery { CategoryTitle = categoryTitle }));
        }        
    }
}
