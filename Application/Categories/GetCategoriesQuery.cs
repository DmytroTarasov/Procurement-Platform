using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.Categories
{
    public class GetCategoriesQuery : IRequest<Result<List<CategoryDto>>>
    {     
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, Result<List<CategoryDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(IUnitOfWork uof, IMapper mapper)
        {
            _uof = uof;
            _mapper = mapper;
        }

        public async Task<Result<List<CategoryDto>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _uof.CategoryRepository.GetAllCategoriesAsync();
            return Result<List<CategoryDto>>.Success(_mapper.Map<List<CategoryDto>>(categories));
        }
    }
}
