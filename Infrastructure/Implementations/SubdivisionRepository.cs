using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class SubdivisionRepository : Repository<Subdivision>, ISubdivisionRepository
    {
        public SubdivisionRepository(DataContext context) : base(context) { }

        public async Task<Subdivision> GetSubdivisionByIdWithCompanyAsync(int id)
        {
            return await GetAll().Include(s => s.Company).FirstAsync(s => s.Id == id);
        }
    }
}
