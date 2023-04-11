using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class GetCompaniesQuery : IRequest<Result<List<CompanyDto>>>
    {
    }

    public class GetCompaniesQueryHandler : IRequestHandler<GetCompaniesQuery, Result<List<CompanyDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetCompaniesQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<Result<List<CompanyDto>>> Handle(GetCompaniesQuery request, CancellationToken cancellationToken)
        {
            var companies = await _context.Companies.Include(c => c.Subdivisions).ToListAsync();
            return Result<List<CompanyDto>>.Success(_mapper.Map<List<CompanyDto>>(companies));
        }
    }
}
