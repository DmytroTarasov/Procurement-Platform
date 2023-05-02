using Domain;

namespace Infrastructure.Interfaces
{
    public interface ICompanyRepository : IRepository<Company>
    {
        Task<IEnumerable<Company>> GetAllCompaniesWithRelationsAsync();     
        Task<Company> GetCompanyByIdWithSubdivisionsAsync(int id);
    }
}
