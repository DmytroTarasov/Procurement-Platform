using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public int? SubdivisionId { get; set; }
        public Subdivision Subdivision { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
