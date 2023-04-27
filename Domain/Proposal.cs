namespace Domain
{
    public class Proposal : BaseEntity
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int SupplierId { get; set; }
        public User Supplier { get; set; }
        public int? TransporterId { get; set; }
        public User Transporter { get; set; }
        public decimal SupplierPrice { get; set; }
        public string SupplierAdditionalInfo { get; set; } 
        public decimal? TransporterSum { get; set; } 
        public string TransporterAdditionalInfo { get; set; }
        public int? ShipmentAddressId { get; set; }
        public Address ShipmentAddress { get; set; }
        public ProposalStatus Status { get; set; } = ProposalStatus.Active;
    }
}
