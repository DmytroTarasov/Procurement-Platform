namespace Application.Dtos
{
    public class RequestDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public SubdivisionDto Subdivision { get; set; }
        public ProcurementItemDto ProcurementItem { get; set; }
        public int ProcurementItemId { get; set; }
        public int? Quantity { get; set; }
        public string MeasurementUnit { get; set; }
        public decimal Budget { get; set; }
        public string Status { get; set; }
        public int? OrderId { get; set; }
    }
}
