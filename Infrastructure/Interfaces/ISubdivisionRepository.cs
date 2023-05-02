using Domain;

namespace Infrastructure.Interfaces
{
    public interface ISubdivisionRepository : IRepository<Subdivision>
    {
        Task<Subdivision> GetSubdivisionByIdWithCompanyAsync(int id);
    }
}
