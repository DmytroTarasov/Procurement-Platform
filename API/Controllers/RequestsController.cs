using Application.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class RequestsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyRequests() {
            return HandleResult(await Mediator.Send(new GetCompanyRequestsQuery()));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRequest([FromBody] EditRequestCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
