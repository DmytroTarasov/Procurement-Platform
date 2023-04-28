using Application.Common.Helpers;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class CreateCategoryCommand : IRequest<Result<int>>
    {
        public string Title { get; set; }
        public string Type { get; set; }
    }

    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateCategoryCommandHandler(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {   
            var category = new Category {
                Title = request.Title,
                Type = (CategoryType)Enum.Parse(typeof(CategoryType), request.Type)
            };

            _context.Categories.Add(category);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось створити категорію. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(category.Id);
        }
    }
}
