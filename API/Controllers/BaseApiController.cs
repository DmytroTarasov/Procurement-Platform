using Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
            
        protected ActionResult HandleResult<T>(Result<T> result) {
            if (result == null) return NotFound();
            if(result.IsSuccess && result.Value != null) 
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            if (!result.IsSuccess && result.ValidationErrors != null)
                return BadRequest(result.ValidationErrors);
            if (!result.IsSuccess && result.IsForbidden)
                return Forbid(result.Error);
            return BadRequest(result.Error);
        }
    }
}
