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
    public class SubmitProposalCommand : IRequest<Result<int>>
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

    public class SubmitProposalCommandHandler : IRequestHandler<SubmitProposalCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SubmitProposalCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(SubmitProposalCommand command, CancellationToken cancellationToken)
        {   
            if (command.ShipmentAddress != null) {
                var address = _mapper.Map<Address>(command.ShipmentAddress);
                _context.Addresses.Add(address);
                var addressResult = await _context.SaveChangesAsync() > 0;
                if (!addressResult) return Result<int>.Failure("Не вдалось додати адресу відвантаження. Спробуйте, будь ласка, пізніше");
                command.ShipmentAddressId = address.Id;
            }

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            Proposal proposal;
            if (role == UserRoles.Supplier) {
                proposal = new Proposal {
                    OrderId = command.OrderId,
                    SupplierId = userId,
                    SupplierPrice = command.SupplierPrice.Value,
                    SupplierAdditionalInfo = command.SupplierAdditionalInfo,
                    ShipmentAddressId = command.ShipmentAddressId.Value
                };
                _context.Proposals.Add(proposal);
            } else {
                proposal = await _context.Proposals.FirstOrDefaultAsync(p => p.Id == command.ProposalId.Value);

                if (proposal == null) return Result<int>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");
                
                proposal.TransporterId = userId;
                proposal.TransporterSum = command.TransporterSum;
                proposal.TransporterAdditionalInfo = command.TransporterAdditionalInfo;
                _context.Proposals.Update(proposal);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(proposal.Id);
        }
    }
}
