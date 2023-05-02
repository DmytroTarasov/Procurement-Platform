using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.ProcurementItems
{
    public class GetProcurementItemsQuery : IRequest<Result<List<ProcurementItemDto>>>
    {     
        public string CategoryTitle { get; set; }
    }

    public class GetProcurementItemsQueryHandler : IRequestHandler<GetProcurementItemsQuery, Result<List<ProcurementItemDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;

        public GetProcurementItemsQueryHandler(IUnitOfWork uof, IMapper mapper)
        {
            _uof = uof; 
            _mapper = mapper;
        }

        public async Task<Result<List<ProcurementItemDto>>> Handle(GetProcurementItemsQuery request, CancellationToken cancellationToken)
        {
            var procurementItems = await _uof.ProcurementItemRepository.GetProcurementItemsByCategoryAsync(request.CategoryTitle);
            return Result<List<ProcurementItemDto>>.Success(_mapper.Map<List<ProcurementItemDto>>(procurementItems));
        }
    }
}
