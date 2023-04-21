namespace Application.Dtos
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Edrpou { get; set; }
        public AddressDto Address { get; set; }
        public ICollection<SubdivisionDto> Subdivisions { get; set; }
    }
}
