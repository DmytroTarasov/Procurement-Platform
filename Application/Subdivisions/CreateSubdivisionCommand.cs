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
    public class CreateSubdivisionCommand : IRequest<Result<Unit>>
    {
        public SubdivisionDto Subdivision { get; set; }
        public int CompanyId { get; set; }
    }
    public class CreateSubdivisionCommandHandler : IRequestHandler<CreateSubdivisionCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IValidator<SubdivisionDto> _validator;
        private readonly IMapper _mapper;
        public CreateSubdivisionCommandHandler(DataContext context, IValidator<SubdivisionDto> validator, IMapper mapper) {
            _context = context;
            _validator = validator;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateSubdivisionCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.Subdivision);

            if (!validationResult.IsValid) 
            {
                return Result<Unit>.ValidationFailure(validationResult.ToDictionary());
            }

            var company = await _context.Companies.Include(c => c.Subdivisions).FirstOrDefaultAsync(c => c.Id == request.CompanyId);

            if (company == null) return Result<Unit>.Failure("Вказаної компанії не зареєстровано, тому підрозділ створити не вдалось");

            var subdivision = _mapper.Map<Subdivision>(request.Subdivision);

            company.Subdivisions.Add(subdivision);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось створити підрозділ. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
