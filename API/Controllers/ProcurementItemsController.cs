using Application.ProcurementItems;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProcurementItemsController : BaseApiController
    { 
        [HttpGet]
        public async Task<IActionResult> GetProcurementItems([FromQuery] string categoryTitle) {
            return HandleResult(await Mediator.Send(new GetProcurementItemsQuery { CategoryTitle = categoryTitle }));
        }        
    }
}
