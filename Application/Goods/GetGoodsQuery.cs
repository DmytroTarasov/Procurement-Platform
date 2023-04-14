using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Goods
{
    public class GetGoodsQuery : IRequest<Result<List<GoodDto>>>
    {     
    }

    public class GetGoodsQueryHandler : IRequestHandler<GetGoodsQuery, Result<List<GoodDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetGoodsQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<Result<List<GoodDto>>> Handle(GetGoodsQuery request, CancellationToken cancellationToken)
        {
            var goods = await _context.Goods.OrderBy(g => g.Title).ToListAsync();
            return Result<List<GoodDto>>.Success(_mapper.Map<List<GoodDto>>(goods));
        }
    }
}