using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{

    public class GetOrderDetailsQuery : IRequest<Result<OrderDto>>
    {     
        public int Id { get; set; }
    }

    public class GetOrderDetailsQueryHandler : IRequestHandler<GetOrderDetailsQuery, Result<OrderDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetOrderDetailsQueryHandler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context; 
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<OrderDto>> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {   
            var order = await _context.Orders
                // .Include(o => o.Requests)
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(o => o.Id == request.Id);
            
            if (order == null) return Result<OrderDto>.Failure("Замовлення з таким ідентифікатором не існує.");
        
            return Result<OrderDto>.Success(order);
        }
    }
}
