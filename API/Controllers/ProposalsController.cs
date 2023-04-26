using API.Helpers;
using Application.Proposals;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProposalsController : BaseApiController
    {
        [AuthorizeRoles(UserRoles.Supplier, UserRoles.Transporter)]
        [HttpPost]
        public async Task<IActionResult> SubmitProposal([FromBody] SubmitProposalCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        [AuthorizeRoles(UserRoles.Supplier, UserRoles.Transporter)]
        [HttpPatch("{id}/cancel")]
        public async Task<IActionResult> CancelProposal(int id, [FromBody] bool cancelTransportProposal) {
            return HandleResult(await Mediator.Send(new CancelProposalCommand { Id = id, CancelTransportProposal = cancelTransportProposal}));
        }

        [AuthorizeRoles(UserRoles.Customer)]
        [HttpPatch("{id}/choose")]
        public async Task<IActionResult> ChooseProposal(int id) {
            return HandleResult(await Mediator.Send(new ChooseProposalCommand { ProposalId = id }));
        }
    }
}
