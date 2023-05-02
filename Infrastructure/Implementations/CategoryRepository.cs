using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DataContext context) : base(context) { }
        
        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await GetAll().OrderBy(c => c.Title).ToListAsync();
        }
    }
}
