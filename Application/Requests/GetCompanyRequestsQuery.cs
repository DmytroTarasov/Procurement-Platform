using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Requests
{
    public class GetCompanyRequestsQuery : IRequest<Result<PagedList<RequestDto>>>
    {     
        public RequestsParams RequestsParams { get; set; }
    }

    public class GetCompanyRequestsQueryHandler : IRequestHandler<GetCompanyRequestsQuery, Result<PagedList<RequestDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetCompanyRequestsQueryHandler(IUnitOfWork uof, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _uof = uof; 
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<PagedList<RequestDto>>> Handle(GetCompanyRequestsQuery request, CancellationToken cancellationToken)
        {
            var companyId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("companyId"));
            var role = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            var query = _uof.RequestRepository.GetCompanyRequestsQuery(companyId, role, request.RequestsParams.Status,
                request.RequestsParams.CategoryTitle, request.RequestsParams.ProcurementItemTitle);

            var pagedList = await PagedList<RequestDto>.CreateAsync(
                query.ProjectTo<RequestDto>(_mapper.ConfigurationProvider),
                request.RequestsParams.PageNumber, 
                request.RequestsParams.PageSize);
            return Result<PagedList<RequestDto>>.Success(pagedList);
        }
    }
}
