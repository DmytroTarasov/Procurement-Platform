namespace Application.Common.Helpers
{
    public class OrdersParams : PaginationParams
    {
        public string Status { get; set; }
        public bool CompanyOrders { get; set; }
    }
}
