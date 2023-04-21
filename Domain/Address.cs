namespace Domain
{
    public class Address : BaseEntity
    {
        public string City { get; set; } 
        public string Region { get; set; }    
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string ZipCode { get; set; }          
    }
}
