using API.Extensions;
using API.Helpers;
using Application.Common.Helpers;
using Application.Requests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AuthorizeRoles(UserRoles.Applicant, UserRoles.Customer)]
    public class RequestsController : BaseApiController
    {
        [AuthorizeRoles(UserRoles.Applicant)]
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyRequests([FromQuery] RequestsParams requestsParams) {
            var requestsResult = await Mediator.Send(new GetCompanyRequestsQuery { RequestsParams = requestsParams });
            var requests = requestsResult.Value;
            Response.AddPaginationHeader(requests.CurrentPage, requests.PageSize, requests.TotalCount, requests.TotalPages);
            return HandleResult(requestsResult);
        }

        [AuthorizeRoles(UserRoles.Applicant)]
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditRequest([FromBody] EditRequestCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        [AuthorizeRoles(UserRoles.Applicant)]
        [HttpPatch("{id}/cancel")]
        public async Task<IActionResult> CancelRequest(int id) {
            return HandleResult(await Mediator.Send(new CancelRequestCommand { Id = id }));
        }
    }
}
