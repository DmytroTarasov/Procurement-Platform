using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Proposals
{
    public class CancelProposalCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public bool CancelTransportProposal { get; set; }
    }
    public class CancelProposalCommandHandler : IRequestHandler<CancelProposalCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public CancelProposalCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        public async Task<Result<int>> Handle(CancelProposalCommand command, CancellationToken cancellationToken)
        {
            var proposal = await _context.Proposals.FirstOrDefaultAsync(p => p.Id == command.Id);

            if (proposal == null) return Result<int>.Failure("Такої пропозиції не існує");

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            if ((role == UserRoles.Supplier && userId != proposal.SupplierId) ||
                (role == UserRoles.Transporter && userId != proposal.TransporterId)) {
                return Result<int>.Forbidden();
            }

            if (role == UserRoles.Supplier && !command.CancelTransportProposal) {
                proposal.Status = ProposalStatus.Cancelled;
            } else {
                proposal.TransporterId = null;
                proposal.TransporterSum = null;
                proposal.TransporterAdditionalInfo = null;

                await _context.Proposals
                    .Where(p => p.SupplierId == proposal.SupplierId && p.TransporterId == null && p.Id != proposal.Id)
                    .ForEachAsync(p => _context.Proposals.Remove(p));
            }
            _context.Proposals.Update(proposal);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось скасувати пропозицію. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(proposal.Id);
        }
    }
}
