namespace Domain
{
    public class Subdivision : BaseEntity
    {
        public string Title { get; set; }   
        public string City { get; set; }     
        public string Street { get; set; }
        public string Apartment { get; set; }
        public string ZipCode { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Request> Requests { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
