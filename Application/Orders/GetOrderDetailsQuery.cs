using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

namespace Application.Orders
{

    public class GetOrderDetailsQuery : IRequest<Result<OrderDto>>
    {     
        public int Id { get; set; }
    }

    public class GetOrderDetailsQueryHandler : IRequestHandler<GetOrderDetailsQuery, Result<OrderDto>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;

        public GetOrderDetailsQueryHandler(IUnitOfWork uof, IMapper mapper)
        {
            _uof = uof; 
            _mapper = mapper;
        }

        public async Task<Result<OrderDto>> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
        {   
            var order = await _uof.OrderRepository.GetAll()
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);
            
            if (order == null) return Result<OrderDto>.Failure("Замовлення з таким ідентифікатором немає");
        
            return Result<OrderDto>.Success(order);
        }
    }
}
