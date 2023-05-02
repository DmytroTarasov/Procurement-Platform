using Domain;

namespace Infrastructure.Interfaces
{
    public interface IProcurementItemRepository : IRepository<ProcurementItem>
    {
        Task<IEnumerable<ProcurementItem>> GetProcurementItemsByCategoryAsync(string categoryTitle);
    }
}
