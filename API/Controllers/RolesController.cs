using Application.Roles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RolesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllRoles() {
            return HandleResult(await Mediator.Send(new GetRolesQuery()));
        }
    }
}
