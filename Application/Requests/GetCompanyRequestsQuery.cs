using System.Security.Claims;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class GetCompanyRequestsQuery : IRequest<Result<PagedList<RequestDto>>>
    {     
        public RequestsParams RequestsParams { get; set; }
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
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            var query = _context.Requests
                .Include(c => c.Subdivision)
                .ThenInclude(s => s.Company)
                .Include(c => c.ProcurementItem)
                .ThenInclude(p => p.Category)
                .Where(r => r.Subdivision.CompanyId == companyId);

            if (role == "Замовник") {
                query = query.Where(r => r.Status == RequestStatus.Active);
            } else {
                RequestStatus status;
                if (!string.IsNullOrEmpty(request.RequestsParams.Status) &&
                    Enum.TryParse(request.RequestsParams.Status, out status)) {
                    query = query.Where(r => r.Status == status);
                }
            }

            if (!string.IsNullOrEmpty(request.RequestsParams.CategoryTitle)) {
                query = query.Where(r => r.ProcurementItem.Category.Title == request.RequestsParams.CategoryTitle);
            }

            if (!string.IsNullOrEmpty(request.RequestsParams.ProcurementItemTitle)) {
                query = query.Where(r => r.ProcurementItem.Title == request.RequestsParams.ProcurementItemTitle);
            }

            query = query.OrderByDescending(r => r.CreatedAt);

            var pagedList = await PagedList<RequestDto>.CreateAsync(
                query.ProjectTo<RequestDto>(_mapper.ConfigurationProvider),
                request.RequestsParams.PageNumber, 
                request.RequestsParams.PageSize);
            return Result<PagedList<RequestDto>>.Success(pagedList);
        }
    }
}
