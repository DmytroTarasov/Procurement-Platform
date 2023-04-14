using System.Security.Claims;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class GetCompanyRequestsQuery : IRequest<Result<List<RequestDto>>>
    {     
    }

    public class GetCompanyRequestsQueryHandler : IRequestHandler<GetCompanyRequestsQuery, Result<List<RequestDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetCompanyRequestsQueryHandler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context; 
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<List<RequestDto>>> Handle(GetCompanyRequestsQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));
            var companyRequests = await _context.Requests
                .Include(c => c.Subdivision)
                .ThenInclude(s => s.Company)
                .Include(c => c.Good)
                .Where(r => r.Subdivision.CompanyId == companyId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            return Result<List<RequestDto>>.Success(_mapper.Map<List<RequestDto>>(companyRequests));
        }
    }
}
