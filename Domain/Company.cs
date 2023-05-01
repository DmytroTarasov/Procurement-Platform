namespace Domain
{
    public class Company : BaseEntity
    {
        public string Title { get; set; }
        public string Edrpou { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<Subdivision> Subdivisions { get; set; }
    }
}
