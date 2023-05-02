using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class RequestRepository : Repository<Request>, IRequestRepository
    {
        public RequestRepository(DataContext context) : base(context) {}
        
        public IQueryable<Request> GetCompanyRequestsQuery(int companyId, string role, string requestStatus, 
            string categoryTitle, string procurementItemTitle)
        {
            var query = GetAll()
                .Include(c => c.Subdivision)
                .ThenInclude(s => s.Company)
                .ThenInclude(c => c.Address)
                .Include(c => c.ProcurementItem)
                .ThenInclude(p => p.Category)
                .Where(r => r.Subdivision.CompanyId == companyId);

            if (role == UserRoles.Customer) {
                query = query.Where(r => r.Status == RequestStatus.Active);
            } else {
                RequestStatus status;
                if (!string.IsNullOrEmpty(requestStatus) && Enum.TryParse(requestStatus, out status)) {
                    query = query.Where(r => r.Status == status);
                }
            }

            if (!string.IsNullOrEmpty(categoryTitle)) {
                query = query.Where(r => r.ProcurementItem.Category.Title == categoryTitle);
            }

            if (!string.IsNullOrEmpty(procurementItemTitle)) {
                query = query.Where(r => r.ProcurementItem.Title == procurementItemTitle);
            }

            query = query.OrderByDescending(r => r.CreatedAt);
            return query;
        }
    }
}
