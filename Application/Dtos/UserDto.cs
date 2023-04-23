namespace Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }   
        public string Token { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int? SubdivisionId { get; set; }
        public int? CompanyId { get; set; }
    }
}
