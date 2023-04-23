namespace Application.Dtos
{
    public class ProposalDto
    {
        public int Id { get; set; }
        public ContactPersonDto SupplierContactPerson { get; set; }
        public ContactPersonDto TransporterContactPerson { get; set; }
        public decimal SupplierPrice { get; set; }
        public string SupplierAdditionalInfo { get; set; } 
        public decimal? TransporterSum { get; set; } 
        public string TransporterAdditionalInfo { get; set; }
        public AddressDto ShipmentAddress { get; set; }
        public string Status { get; set; }
    }
}
