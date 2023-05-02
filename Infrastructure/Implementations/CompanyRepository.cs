using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        public CompanyRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Company>> GetAllCompaniesWithRelationsAsync()
        {
            return await GetAll().Include(c => c.Address).Include(c => c.Subdivisions).ToListAsync();
        }

        public async Task<Company> GetCompanyByIdWithSubdivisionsAsync(int id)
        {
            return await GetAll().Include(c => c.Subdivisions).FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
