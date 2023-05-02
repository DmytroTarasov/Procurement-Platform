using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.Companies
{
    public class CreateCompanyCommand : IRequest<Result<Unit>>
    {
        public CompanyDto Company { get; set; }
    }
    public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand, Result<Unit>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IValidator<CompanyDto> _validator;
        private readonly IMapper _mapper;
        public CreateCompanyCommandHandler(IUnitOfWork uof, IValidator<CompanyDto> validator, IMapper mapper) {
            _uof = uof;
            _validator = validator;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.Company);

            if (!validationResult.IsValid) 
            {
                return Result<Unit>.ValidationFailure(validationResult.ToDictionary());
            }

            var company = _mapper.Map<Company>(request.Company);

            _uof.CompanyRepository.Add(company);
            
            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось створити компанію. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
