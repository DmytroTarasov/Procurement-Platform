namespace Application.Dtos
{
    public class RequestDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public SubdivisionDto Subdivision { get; set; }
        public GoodDto Good { get; set; }
        public int GoodId { get; set; }
        public int Quantity { get; set; }
        public string MeasurementUnit { get; set; }
        public decimal Budget { get; set; }
        public int? OrderId { get; set; }
    }
}
