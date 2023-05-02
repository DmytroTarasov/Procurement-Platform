using Application.Common.Helpers;
using AutoMapper;
using Domain;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.Categories
{
    public class CreateCategoryCommand : IRequest<Result<Unit>>
    {
        public string Title { get; set; }
        public string Type { get; set; }
    }

    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Result<Unit>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        public CreateCategoryCommandHandler(IUnitOfWork uof, IMapper mapper) {
            _uof = uof;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {   
            var category = new Category {
                Title = request.Title,
                Type = (CategoryType)Enum.Parse(typeof(CategoryType), request.Type)
            };
            
            _uof.CategoryRepository.Add(category);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось створити категорію. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
