namespace Domain
{
    public class Proposal : BaseEntity
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int SupplierId { get; set; }
        public User Supplier { get; set; }
        public int TransporterId { get; set; }
        public User Transporter { get; set; }
        public decimal SupplierPrice { get; set; }
        public decimal TransporterSum { get; set; }
    }
}
