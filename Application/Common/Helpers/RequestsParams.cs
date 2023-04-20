namespace Application.Common.Helpers
{
    public class RequestsParams : PaginationParams
    {
        public string Status { get; set; }
        public string CategoryTitle { get; set; }
        public string ProcurementItemTitle { get; set; }
    }
}
