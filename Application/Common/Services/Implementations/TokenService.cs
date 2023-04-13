using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Common.Services.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace Application.Common.Services.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;
        public TokenService(UserManager<User> userManager, IConfiguration config, DataContext context)
        {
            _userManager = userManager;
            _config = config;
            _context = context;
        }

        public async Task<string> CreateTokenAsync(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var subdivision = user.SubdivisionId.HasValue 
                ? await _context.Subdivisions.Include(s => s.Company).FirstAsync(s => s.Id == user.SubdivisionId)
                : null;

            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                // new Claim("subdivisionId", user.SubdivisionId.HasValue ? user.SubdivisionId.Value.ToString() : null)
                new Claim("subdivisionId", subdivision != null ? subdivision.Id.ToString() : ""),
                new Claim("companyId", subdivision != null ? subdivision.CompanyId.ToString() : "")
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
