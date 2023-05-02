using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Orders
{
    public class GetOrdersQuery : IRequest<Result<PagedList<OrderDto>>>
    {     
        public OrdersParams OrdersParams { get; set; }
    }

    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, Result<PagedList<OrderDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetOrdersQueryHandler(IUnitOfWork uof, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _uof = uof; 
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<PagedList<OrderDto>>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {        
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            var companyId = _httpContextAccessor.HttpContext.User.FindFirstValue("companyId");
            var query = _uof.OrderRepository.GetOrdersQuery(companyId, role, request.OrdersParams.Status, request.OrdersParams.CompanyOrders);

            var pagedList = await PagedList<OrderDto>.CreateAsync(
                query.ProjectTo<OrderDto>(_mapper.ConfigurationProvider),
                request.OrdersParams.PageNumber, 
                request.OrdersParams.PageSize);
            return Result<PagedList<OrderDto>>.Success(pagedList);
        }
    }
}
