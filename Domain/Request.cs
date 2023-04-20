namespace Domain
{
    public class Request : BaseEntity
    {
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int SubdivisionId { get; set; }
        public Subdivision Subdivision { get; set; }
        public int ProcurementItemId { get; set; }
        public ProcurementItem ProcurementItem { get; set; }
        public int? Quantity { get; set; }
        public MeasurementUnit? MeasurementUnit { get; set; }
        public decimal Budget { get; set; }
        public RequestStatus Status { get; set; } = RequestStatus.Active;
        public int? OrderId { get; set; }
        public Order Order { get; set; }
    }
}
