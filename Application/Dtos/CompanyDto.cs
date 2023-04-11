namespace Application.Dtos
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Edrpou { get; set; }
        public string City { get; set; }     
        public string Street { get; set; }
        public string Apartment { get; set; }
        public string ZipCode { get; set; }
        public ICollection<SubdivisionDto> Subdivisions { get; set; }
    }
}
