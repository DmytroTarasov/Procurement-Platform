namespace Application.Dtos
{
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }   
        public string Email { get; set; }
        public string Role { get; set; } 
        public string Password { get; set; }
        public int? SubdivisionId { get; set; }
        public int? CompanyId { get; set; }
    }
}
