using Application.Common.Services.Interfaces;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto) {
            return HandleResult(await _authService.RegisterAsync(registerDto));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto) {
            return HandleResult(await _authService.LoginAsync(loginDto));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser() {
            return HandleResult(await _authService.GetCurrentUserAsync());
        }
    }
}
