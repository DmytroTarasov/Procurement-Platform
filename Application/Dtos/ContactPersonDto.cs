namespace Application.Dtos
{
    public class ContactPersonDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }   
        public string Email { get; set; }
        public int CompanyId { get; set; }
        public string CompanyTitle { get; set; }
        public string CompanyEdrpou { get; set; }
        public AddressDto CompanyAddress { get; set; }
    }
}
