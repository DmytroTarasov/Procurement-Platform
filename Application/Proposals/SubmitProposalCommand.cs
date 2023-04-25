using System.Security.Claims;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Proposals
{
    public class SubmitProposalCommand : IRequest<Result<Unit>>
    {
        public int? ProposalId { get; set; }
        public int OrderId { get; set; }
        public int? SupplierId { get; set; }
        public int? TransporterId { get; set; }
        public decimal? SupplierPrice { get; set; }
        public string SupplierAdditionalInfo { get; set; } 
        public decimal? TransporterSum { get; set; } 
        public string TransporterAdditionalInfo { get; set; }
        public int? ShipmentAddressId { get; set; }
        public AddressDto ShipmentAddress { get; set; }
    }

    public class SubmitProposalCommandHandler : IRequestHandler<SubmitProposalCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SubmitProposalCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(SubmitProposalCommand command, CancellationToken cancellationToken)
        {   
            if (command.ShipmentAddress != null) {
                var address = _mapper.Map<Address>(command.ShipmentAddress);
                _context.Addresses.Add(address);
                var addressResult = await _context.SaveChangesAsync() > 0;
                if (!addressResult) return Result<Unit>.Failure("Не вдалось додати адресу відвантаження. Спробуйте, будь ласка, пізніше");
                command.ShipmentAddressId = address.Id;
            }

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            if (role == UserRoles.Supplier && command.ProposalId == null) {
                var proposal = new Proposal {
                    OrderId = command.OrderId,
                    SupplierId = userId,
                    SupplierPrice = command.SupplierPrice.Value,
                    SupplierAdditionalInfo = command.SupplierAdditionalInfo,
                    ShipmentAddressId = command.ShipmentAddressId.Value
                };
                _context.Proposals.Add(proposal);
            } else {
                var proposal = await _context.Proposals.FirstOrDefaultAsync(p => p.Id == command.ProposalId.Value);

                if (proposal == null) return Result<Unit>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

                var anotherSupplierProposal = await _context.Proposals
                    .FirstOrDefaultAsync(p => p.SupplierId == proposal.SupplierId && p.TransporterId == null && 
                    p.Id != proposal.Id);
                
                if (proposal.TransporterId == null || anotherSupplierProposal != null) {
                    var proposalToUpdate = proposal.TransporterId == null ? proposal : anotherSupplierProposal;
                    proposalToUpdate.TransporterId = userId;
                    proposalToUpdate.TransporterSum = command.TransporterSum;
                    proposalToUpdate.TransporterAdditionalInfo = command.TransporterAdditionalInfo;
                    _context.Proposals.Update(proposalToUpdate);
                } else {
                    _context.Proposals.Add(CreateProposal(proposal, userId, command.TransporterSum, command.TransporterAdditionalInfo));
                }
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }

        private Proposal CreateProposal(Proposal proposal, int transporterId, 
            decimal? transporterSum, string transporterAdditionalInfo) {
            return new Proposal {
                OrderId = proposal.OrderId,
                SupplierId = proposal.SupplierId,
                SupplierPrice = proposal.SupplierPrice,
                SupplierAdditionalInfo = proposal.SupplierAdditionalInfo,
                ShipmentAddressId = proposal.ShipmentAddressId,
                TransporterId = transporterId,
                TransporterSum = transporterSum,
                TransporterAdditionalInfo = transporterAdditionalInfo
            };
        }
    }
}
