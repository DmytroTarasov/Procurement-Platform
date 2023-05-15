using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
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
        private readonly IMapper _mapper;
        public CreateCompanyCommandHandler(IUnitOfWork uof, IMapper mapper) {
            _uof = uof;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
        {
            var company = _mapper.Map<Company>(request.Company);

            _uof.CompanyRepository.Add(company);
            
            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось створити компанію. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
