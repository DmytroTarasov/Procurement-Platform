using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subdivisions
{
    public class CreateSubdivisionCommand : IRequest<Result<int>>
    {
        public SubdivisionDto Subdivision { get; set; }
        public int CompanyId { get; set; }
    }
    public class CreateSubdivisionCommandHandler : IRequestHandler<CreateSubdivisionCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IValidator<SubdivisionDto> _validator;
        private readonly IMapper _mapper;
        public CreateSubdivisionCommandHandler(DataContext context, IValidator<SubdivisionDto> validator, IMapper mapper) {
            _context = context;
            _validator = validator;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(CreateSubdivisionCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.Subdivision);

            if (!validationResult.IsValid) 
            {
                return Result<int>.ValidationFailure(validationResult.ToDictionary());
            }

            var company = await _context.Companies.Include(c => c.Subdivisions).FirstOrDefaultAsync(c => c.Id == request.CompanyId);

            if (company == null) return Result<int>.Failure("Вказаної компанії не зареєстровано, тому підрозділ створити не вдалось.");

            var subdivision = _mapper.Map<Subdivision>(request.Subdivision);

            company.Subdivisions.Add(subdivision);

            // _context.Subdivisions.Add(subdivision);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось створити підрозділ. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(subdivision.Id);
        }
    }
}
