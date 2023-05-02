using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

namespace Application.Roles
{
    public class GetRolesQuery : IRequest<Result<List<RoleDto>>>
    {     
    }

    public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, Result<List<RoleDto>>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;

        public GetRolesQueryHandler(IUnitOfWork uof, IMapper mapper)
        {
            _uof = uof; 
            _mapper = mapper;
        }

        public async Task<Result<List<RoleDto>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            var roles = await _uof.RoleRepository.GetByCondition(r => r.Name != UserRoles.Administrator).ToListAsync();
            return Result<List<RoleDto>>.Success(_mapper.Map<List<RoleDto>>(roles));
        }
    }
}
