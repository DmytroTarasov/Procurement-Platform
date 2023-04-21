namespace Application.Dtos
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string City { get; set; } 
        public string Region { get; set; }    
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string ZipCode { get; set; }  
    }
}
