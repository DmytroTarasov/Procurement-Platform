namespace Domain
{
    public class Subdivision : BaseEntity
    {
        public string Title { get; set; }   
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Request> Requests { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
