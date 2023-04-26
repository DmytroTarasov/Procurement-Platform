using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Addresses
{
    public class GetAddressesQuery : IRequest<Result<List<AddressDto>>>
    {
    }

    public class GetAddressesQueryHandler : IRequestHandler<GetAddressesQuery, Result<List<AddressDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAddressesQueryHandler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<List<AddressDto>>> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            List<Address> orderAddresses;
            if (role == UserRoles.Customer) {
                orderAddresses = await _context.Orders
                    .Include(o => o.DeliveryAddress)
                    .Include(o => o.BuyerContactPerson)
                    .ThenInclude(p => p.Subdivision)
                    .Where(o => o.BuyerContactPerson.Subdivision.CompanyId == companyId)
                    .Select(o => o.DeliveryAddress)
                    .Distinct()
                    .ToListAsync();
            } else {
                orderAddresses = await _context.Proposals
                    .Include(p => p.ShipmentAddress)
                    .Include(p => p.Supplier)
                    .ThenInclude(s => s.Subdivision)
                    .Where(p => p.Supplier.Subdivision.CompanyId == companyId)
                    .Select(p => p.ShipmentAddress)
                    .Distinct()
                    .ToListAsync();
            }

            return Result<List<AddressDto>>.Success(_mapper.Map<List<AddressDto>>(orderAddresses));
        }
    }
}
