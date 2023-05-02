using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.Subdivisions
{
    public class CreateSubdivisionCommand : IRequest<Result<Unit>>
    {
        public SubdivisionDto Subdivision { get; set; }
        public int CompanyId { get; set; }
    }
    public class CreateSubdivisionCommandHandler : IRequestHandler<CreateSubdivisionCommand, Result<Unit>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IValidator<SubdivisionDto> _validator;
        private readonly IMapper _mapper;
        public CreateSubdivisionCommandHandler(IUnitOfWork uof, IValidator<SubdivisionDto> validator, IMapper mapper) {
            _uof = uof;
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

            var company = await _uof.CompanyRepository.GetCompanyByIdWithSubdivisionsAsync(request.CompanyId);

            if (company == null) return Result<Unit>.Failure("Вказаної компанії не зареєстровано, тому підрозділ створити не вдалось");

            var subdivision = _mapper.Map<Subdivision>(request.Subdivision);

            company.Subdivisions.Add(subdivision);
            
            _uof.CompanyRepository.Update(company);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось створити підрозділ. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
