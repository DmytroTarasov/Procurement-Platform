using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roles
{
    public class GetRolesQuery : IRequest<Result<List<RoleDto>>>
    {     
    }

    public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, Result<List<RoleDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetRolesQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<Result<List<RoleDto>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            var roles = await _context.Roles.Where(r => r.Name != UserRoles.Administrator).ToListAsync();
            return Result<List<RoleDto>>.Success(_mapper.Map<List<RoleDto>>(roles));
        }
    }
}
