using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Addresses
{
    public class GetAddressesQuery : IRequest<Result<List<AddressDto>>>
    {
    }

    public class GetAddressesQueryHandler : IRequestHandler<GetAddressesQuery, Result<List<AddressDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAddressesQueryHandler(IUnitOfWork uof, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _uof = uof;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<List<AddressDto>>> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            var orderAddresses = role == UserRoles.Customer
                ? await _uof.OrderRepository.GetCustomerDeliveryAddressesByOrdersAsync(companyId)
                : await _uof.ProposalRepository.GetSupplierShipmentAddressesByProposalsAsync(companyId);

            return Result<List<AddressDto>>.Success(_mapper.Map<List<AddressDto>>(orderAddresses));
        }
    }
}
