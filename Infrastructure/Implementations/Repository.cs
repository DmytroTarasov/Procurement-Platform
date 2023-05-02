using System.Linq.Expressions;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected DataContext Context { get; set; }

        public Repository(DataContext context)
        {
            Context = context;
        }

        public async Task<T> GetByIdAsync(int id) {
            return await Context.Set<T>().FindAsync(id);
        }

        public IQueryable<T> GetAll()
        {
            return Context.Set<T>();
        }

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().Where(predicate);
        }

        public void Add(T entity)
        {
            Context.Set<T>().Add(entity);
        }
        
        public void Update(T entity)
        {
            Context.Set<T>().Update(entity);
        }
        
        public void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
        }
    }
}
