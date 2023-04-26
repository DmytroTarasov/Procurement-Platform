using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class CreateCompanyCommand : IRequest<Result<int>>
    {
        public CompanyDto Company { get; set; }
    }
    public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IValidator<CompanyDto> _validator;
        private readonly IMapper _mapper;
        public CreateCompanyCommandHandler(DataContext context, IValidator<CompanyDto> validator, IMapper mapper) {
            _context = context;
            _validator = validator;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.Company);

            if (!validationResult.IsValid) 
            {
                return Result<int>.ValidationFailure(validationResult.ToDictionary());
            }

            var company = _mapper.Map<Company>(request.Company);

            _context.Companies.Add(company);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось створити компанію. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(company.Id);
        }
    }
}
