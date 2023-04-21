using System.Security.Claims;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class GetOrdersQuery : IRequest<Result<PagedList<OrderDto>>>
    {     
        public OrdersParams OrdersParams { get; set; }
    }

    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, Result<PagedList<OrderDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetOrdersQueryHandler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context; 
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<PagedList<OrderDto>>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));

            var query = _context.Orders
                .Include(o => o.Requests)
                .AsQueryable();
            
            OrderStatus status;
            if (!string.IsNullOrEmpty(request.OrdersParams.Status) &&
                Enum.TryParse(request.OrdersParams.Status, out status)) {
                query = query.Where(o => o.Status == status);
            }

            if (request.OrdersParams.CompanyOrders) {
                query = query.Where(o => o.BuyerContactPerson.Subdivision.CompanyId == companyId);
            }

            query = query.OrderByDescending(o => o.CreatedAt);

            var pagedList = await PagedList<OrderDto>.CreateAsync(
                query.ProjectTo<OrderDto>(_mapper.ConfigurationProvider),
                request.OrdersParams.PageNumber, 
                request.OrdersParams.PageSize);
            return Result<PagedList<OrderDto>>.Success(pagedList);
        }
    }
}
