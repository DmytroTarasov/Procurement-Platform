using System.Linq.Expressions;

namespace Infrastructure.Interfaces
{
    public interface IRepository<T> where T : class
    {   
        Task<T> GetByIdAsync(int id);
        IQueryable<T> GetAll();
        IQueryable<T> GetByCondition(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
