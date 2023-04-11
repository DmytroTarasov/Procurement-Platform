using Application.Common.Models;
using Application.Companies;
using Application.Dtos;
using Application.Subdivisions;
using Application.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {  
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto) {
            // Result<int> result;
            // if (registerDto.Company != null) {
            //     result = await Mediator.Send(new CreateCompanyCommand { Company = registerDto.Company });
            //     if (result.ValidationErrors != null) return BadRequest(result.ValidationErrors);
            //     if (result.Error != null) return BadRequest(result.Error);
            //     registerDto.Subdivision.CompanyId = result.Value;
            // }
            // if (registerDto.Subdivision != null) {
            //     result = await Mediator.Send(new CreateSubdivisionCommand { Subdivision = registerDto.Subdivision });
            //     if (result.ValidationErrors != null) return BadRequest(result.ValidationErrors);
            //     if (result.Error != null) return BadRequest(result.Error);
            //     registerDto.User.SubdivisionId = result.Value;
            // }
            
            return HandleResult(await Mediator.Send(new RegisterUserCommand { User = registerUserDto }));
        }
    }
}
