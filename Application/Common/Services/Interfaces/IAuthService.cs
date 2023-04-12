using Application.Common.Models;
using Application.Dtos;

namespace Application.Common.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Result<UserDto>> RegisterAsync(RegisterDto registerDto); 
        Task<Result<UserDto>> LoginAsync(LoginDto loginDto);
        Task<Result<UserDto>> GetCurrentUserAsync();
    }
}
