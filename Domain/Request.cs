namespace Domain
{
    public class Request : BaseEntity
    {
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int SubdivisionId { get; set; }
        public Subdivision Subdivision { get; set; }
        public int GoodId { get; set; }
        public Good Good { get; set; }
        public int Quantity { get; set; }
        public MeasurementUnit MeasurementUnit { get; set; }
        public decimal Budget { get; set; }
        public RequestStatus RequestStatus { get; set; } = RequestStatus.Active;
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
