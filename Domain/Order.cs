namespace Domain
{
    public class Order : BaseEntity
    {
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal Budget { get; set; }
        public ICollection<Request> Requests { get; set; }
        public ICollection<Proposal> Proposals { get; set; }
        public int BuyerContactPersonId { get; set; }
        public User BuyerContactPerson { get; set; }
        public int? SupplierContactPersonId { get; set; }
        public User SupplierContactPerson { get; set; }
        public int? TransporterContactPersonId { get; set; }
        public User TransporterContactPerson { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Active;
        public int DeliveryAddressId { get; set; }
        public Address DeliveryAddress { get; set; }
        public int? ShipmentAddressId { get; set; }
        public Address ShipmentAddress { get; set; }
    }
}
