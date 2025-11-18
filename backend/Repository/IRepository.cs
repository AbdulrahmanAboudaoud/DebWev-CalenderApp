using System.Linq.Expressions;

namespace backend.Repository
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        T? GetById(object id);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        IQueryable<T> Query(); // for advanced filtering, joins, grouping
        int SaveChanges();
    }
}