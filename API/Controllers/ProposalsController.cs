using API.Helpers;
using Application.Proposals;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AuthorizeRoles(UserRoles.Supplier, UserRoles.Transporter)]
    public class ProposalsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> SubmitProposal([FromBody] SubmitProposalCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelProposal(int id) {
            return HandleResult(await Mediator.Send(new CancelProposalCommand { Id = id }));
        }
    }
}
