using Domain;

namespace Infrastructure.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<IEnumerable<Role>> GetRolesAsync();
    }
}
