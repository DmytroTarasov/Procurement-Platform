namespace Domain
{
    public class Order : BaseEntity
    {
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal Budget { get; set; }
        public ICollection<Request> Requests { get; set; }
        public ICollection<Proposal> Proposals { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Active;
    }
}
