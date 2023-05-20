using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Common.Services.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Infrastructure.Interfaces;

namespace Application.Common.Services.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _uof;
        public TokenService(UserManager<User> userManager, IConfiguration config, IUnitOfWork uof)
        {
            _userManager = userManager;
            _config = config;
            _uof = uof;
        }

        public async Task<string> CreateTokenAsync(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var subdivision = user.SubdivisionId.HasValue 
                ? await _uof.SubdivisionRepository.GetSubdivisionByIdWithCompanyAsync(user.SubdivisionId.Value)
                : null;

            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
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
