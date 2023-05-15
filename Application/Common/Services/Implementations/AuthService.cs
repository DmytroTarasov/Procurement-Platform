using System.Security.Claims;
using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

namespace Application.Common.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uof;
        public AuthService(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager, SignInManager<User> signInManager, 
            ITokenService tokenService, IMapper mapper, IUnitOfWork uof)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _uof = uof;
        }
        public async Task<Result<UserDto>> RegisterAsync(RegisterDto registerDto)
        {
            var company = await _uof.CompanyRepository.GetByIdAsync(registerDto.CompanyId.Value);

            if (company == null) 
                return Result<UserDto>.Failure("Вказаної компанії немає серед зареєстрованих компаній на платформі");

            if (company.Email.Split("@")[1] != registerDto.Email.Split("@")[1]) 
                return Result<UserDto>.Failure("Назва домену у пошті не співпадає з назвою домену у пошті компанії");

            if (await _userManager.FindByEmailAsync(registerDto.Email) != null) 
                return Result<UserDto>.Failure("Дана пошта зайнята");

            var user = _mapper.Map<User>(registerDto);

            user.UserName = user.Email.Split("@")[0].ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) 
                return Result<UserDto>.Failure("Виникла помилка під час реєстрації. Спробуйте, будь ласка, пізніше");

            var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);
            if (!roleResult.Succeeded) 
                return Result<UserDto>.Failure("Виникла помилка під час призначення ролі. Спробуйте, будь ласка, пізніше");

            user = await _userManager.Users.Include(u => u.Subdivision).FirstAsync(u => u.Email == registerDto.Email);
            return Result<UserDto>.Success(await CreateUserDtoAsync(user));
        }
        public async Task<Result<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(u => u.Subdivision).FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null) return Result<UserDto>.Failure("Невірна пошта");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded) {
                return Result<UserDto>.Success(await CreateUserDtoAsync(user));
            }
            
            return Result<UserDto>.Failure("Невірний пароль");
        }
        public async Task<Result<UserDto>> GetCurrentUserAsync() {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            var email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.Users.Include(u => u.Subdivision).FirstAsync(u => u.Email == email);
            return Result<UserDto>.Success(await CreateUserDtoAsync(user, token));
        }
        private async Task<UserDto> CreateUserDtoAsync(User user, string token = null) {
            var userDto = _mapper.Map<UserDto>(user);
            userDto.Role = (await _userManager.GetRolesAsync(user)).First();
            userDto.Token = token ?? await _tokenService.CreateTokenAsync(user);
            return userDto;
        }
    }
}
