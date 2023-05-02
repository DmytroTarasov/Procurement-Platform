using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await GetByCondition(r => r.Name != UserRoles.Administrator).ToListAsync();
        }
    }
}
