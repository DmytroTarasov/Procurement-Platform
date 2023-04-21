namespace Application.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Budget { get; set; }
        public ContactPersonDto BuyerContactPerson { get; set; }
        public ICollection<OrderRequestDto> Requests { get; set; }
        public string Status { get; set; }
    }
}
