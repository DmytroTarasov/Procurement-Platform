using System.Security.Claims;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class GetCompanyRequestsQuery : IRequest<Result<PagedList<RequestDto>>>
    {     
        public PaginationParams PaginationParams { get; set; }
    }

    public class GetCompanyRequestsQueryHandler : IRequestHandler<GetCompanyRequestsQuery, Result<PagedList<RequestDto>>>
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

        public async Task<Result<PagedList<RequestDto>>> Handle(GetCompanyRequestsQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));
            // var companyRequests = await _context.Requests
            //     .Include(c => c.Subdivision)
            //     .ThenInclude(s => s.Company)
            //     .Include(c => c.Good)
            //     .Where(r => r.Subdivision.CompanyId == companyId)
            //     .OrderByDescending(r => r.CreatedAt)
            //     .ToListAsync();
            var query = _context.Requests
                .Include(c => c.Subdivision)
                .ThenInclude(s => s.Company)
                .Include(c => c.Good)
                .Where(r => r.Subdivision.CompanyId == companyId)
                .OrderByDescending(r => r.CreatedAt)
                .ProjectTo<RequestDto>(_mapper.ConfigurationProvider);
            // return Result<List<RequestDto>>.Success(_mapper.Map<List<RequestDto>>(companyRequests));
            var pagedList = await PagedList<RequestDto>.CreateAsync(query, request.PaginationParams.PageNumber, 
                request.PaginationParams.PageSize);
            return Result<PagedList<RequestDto>>.Success(pagedList);
        }
    }
}
