using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class GetCategoriesQuery : IRequest<Result<List<CategoryDto>>>
    {     
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, Result<List<CategoryDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<Result<List<CategoryDto>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _context.Categories.Include(c => c.Goods).OrderBy(c => c.Title).ToListAsync();
            return Result<List<CategoryDto>>.Success(_mapper.Map<List<CategoryDto>>(categories));
        }
    }
}
