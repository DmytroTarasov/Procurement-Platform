using Application.ProcurementItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ProcurementItemsController : BaseApiController
    { 
        [HttpGet]
        public async Task<IActionResult> GetProcurementItems([FromQuery] string categoryTitle) {
            return HandleResult(await Mediator.Send(new GetProcurementItemsQuery { CategoryTitle = categoryTitle }));
        }        
    }
}
