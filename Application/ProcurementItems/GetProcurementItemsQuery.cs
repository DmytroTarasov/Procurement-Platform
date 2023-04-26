using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProcurementItems
{
    public class GetProcurementItemsQuery : IRequest<Result<List<ProcurementItemDto>>>
    {     
        public string CategoryTitle { get; set; }
    }

    public class GetProcurementItemsQueryHandler : IRequestHandler<GetProcurementItemsQuery, Result<List<ProcurementItemDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetProcurementItemsQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<Result<List<ProcurementItemDto>>> Handle(GetProcurementItemsQuery request, CancellationToken cancellationToken)
        {
            var query = _context.ProcurementItems.Include(p => p.Category).AsQueryable();

            if (!string.IsNullOrEmpty(request.CategoryTitle)) {
                query = query.Where(p => p.Category.Title == request.CategoryTitle);
            }

            var procurementItems = await query.OrderBy(p => p.Title).ToListAsync();
            return Result<List<ProcurementItemDto>>.Success(_mapper.Map<List<ProcurementItemDto>>(procurementItems));
        }
    }
}
