using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(DataContext context) : base(context) { }

        public async Task<IEnumerable<Address>> GetCustomerDeliveryAddressesByOrdersAsync(int companyId)
        {
            return await GetAll()
                    .Include(o => o.DeliveryAddress)
                    .Include(o => o.BuyerContactPerson)
                    .ThenInclude(p => p.Subdivision)
                    .Where(o => o.BuyerContactPerson.Subdivision.CompanyId == companyId)
                    .Select(o => o.DeliveryAddress)
                    .Distinct()
                    .ToListAsync();
        }

        public IQueryable<Order> GetOrdersQuery(string company, string role, string orderStatus, bool companyOrders)
        {
            var query = GetAll()
                .Include(o => o.Requests)
                .AsQueryable();
            
            OrderStatus status;
            if (!string.IsNullOrEmpty(orderStatus) && Enum.TryParse(orderStatus, out status)) {
                query = query.Where(o => o.Status == status);
            }

            if (companyOrders && role != UserRoles.Administrator) {
                var companyId = int.Parse(company);
                query = query.Where(o => o.BuyerContactPerson.Subdivision.CompanyId == companyId);
            }

            query = query.OrderByDescending(o => o.CreatedAt);
            return query;
        }

        public async Task<Order> GetOrderByIdWithRequestsAsync(int id)
        {
            return await GetAll().Include(o => o.Requests).FirstOrDefaultAsync(r => r.Id == id);
        }
    }
}
