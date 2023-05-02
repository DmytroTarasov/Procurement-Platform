using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Infrastructure.Interfaces;

namespace Application.Companies
{
    public class GetCompaniesQuery : IRequest<Result<List<CompanyDto>>>
    {
    }

    public class GetCompaniesQueryHandler : IRequestHandler<GetCompaniesQuery, Result<List<CompanyDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;

        public GetCompaniesQueryHandler(IUnitOfWork uof, IMapper mapper)
        {
            _uof = uof; 
            _mapper = mapper;
        }

        public async Task<Result<List<CompanyDto>>> Handle(GetCompaniesQuery request, CancellationToken cancellationToken)
        {
            var companies = await _uof.CompanyRepository.GetAllCompaniesWithRelationsAsync();
            return Result<List<CompanyDto>>.Success(_mapper.Map<List<CompanyDto>>(companies));
        }
    }
}
