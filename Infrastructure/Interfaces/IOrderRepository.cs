using Domain;

namespace Infrastructure.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<IEnumerable<Address>> GetCustomerDeliveryAddressesByOrdersAsync(int companyId);      
        Task<Order> GetOrderByIdWithRequestsAsync(int id);       
        IQueryable<Order> GetOrdersQuery(string company, string role, string orderStatus, bool companyOrders);
    }
}
