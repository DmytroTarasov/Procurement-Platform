using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

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
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        public SubmitProposalCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(SubmitProposalCommand command, CancellationToken cancellationToken)
        {   
            if (command.ShipmentAddress != null) {
                var address = _mapper.Map<Address>(command.ShipmentAddress);
                _uof.AddressRepository.Add(address);
                var addressResult = await _uof.Complete();
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
                    ShipmentAddressId = command.ShipmentAddressId
                };
                _uof.ProposalRepository.Add(proposal);
            } else {
                var proposal = await _uof.ProposalRepository.GetByIdAsync(command.ProposalId.Value);

                if (proposal == null) return Result<Unit>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

                var anotherSupplierProposal = await _uof.ProposalRepository.GetAnotherSupplierProposalAsync(proposal.OrderId, proposal.Id, proposal.SupplierId);
                
                if (proposal.TransporterId == null || anotherSupplierProposal != null) {
                    var proposalToUpdate = proposal.TransporterId == null ? proposal : anotherSupplierProposal;
                    proposalToUpdate.TransporterId = userId;
                    proposalToUpdate.TransporterSum = command.TransporterSum;
                    proposalToUpdate.TransporterAdditionalInfo = command.TransporterAdditionalInfo;
                    _uof.ProposalRepository.Update(proposalToUpdate);
                } else {
                    _uof.ProposalRepository.Add(CreateProposal(proposal, userId, command.TransporterSum, command.TransporterAdditionalInfo));
                }
            }

            var result = await _uof.Complete();

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
