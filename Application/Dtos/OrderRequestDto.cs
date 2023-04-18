namespace Application.Dtos
{
    public class OrderRequestDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string SubdivisionTitle { get; set; }
        public string GoodTitle { get; set; }
        public string MeasurementUnit { get; set; }
        public int Quantity { get; set; }
    }
}
