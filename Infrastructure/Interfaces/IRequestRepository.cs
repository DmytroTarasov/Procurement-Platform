using Domain;

namespace Infrastructure.Interfaces
{
    public interface IRequestRepository : IRepository<Request>
    {
        IQueryable<Request> GetCompanyRequestsQuery(int companyId, string role, string requestStatus, 
            string categoryTitle, string procurementItemTitle);
    }
}
