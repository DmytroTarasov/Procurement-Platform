using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Proposals
{
    public class CancelProposalCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public bool CancelTransportProposal { get; set; }
    }
    public class CancelProposalCommandHandler : IRequestHandler<CancelProposalCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _uof;
        public CancelProposalCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof)
        {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
        }
        public async Task<Result<Unit>> Handle(CancelProposalCommand command, CancellationToken cancellationToken)
        {
            var proposal = await _uof.ProposalRepository.GetByIdAsync(command.Id);

            if (proposal == null) return Result<Unit>.Failure("Пропозиції з таким ідентифікатором немає");

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            if ((role == UserRoles.Supplier && userId != proposal.SupplierId) ||
                (role == UserRoles.Transporter && userId != proposal.TransporterId)) {
                return Result<Unit>.Forbidden();
            }

            if (role == UserRoles.Supplier && !command.CancelTransportProposal) {
                proposal.Status = ProposalStatus.Cancelled;
            } else {
                proposal.TransporterId = null;
                proposal.TransporterSum = null;
                proposal.TransporterAdditionalInfo = null;

                await _uof.ProposalRepository.DeleteOtherSupplierProposalsAsync(proposal.Id, proposal.SupplierId);
            }
            _uof.ProposalRepository.Update(proposal);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось скасувати пропозицію. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
