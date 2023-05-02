using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class ProcurementItemRepository : Repository<ProcurementItem>, IProcurementItemRepository
    {
        public ProcurementItemRepository(DataContext context) : base(context) { }
        
        public async Task<IEnumerable<ProcurementItem>> GetProcurementItemsByCategoryAsync(string categoryTitle)
        {
            var query = GetAll().Include(p => p.Category).AsQueryable();
            if (!string.IsNullOrEmpty(categoryTitle)) {
                query = query.Where(p => p.Category.Title == categoryTitle);
            }
            return await query.OrderBy(p => p.Title).ToListAsync();
        }
    }
}
