using Application.Companies;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCompanies() {
            return HandleResult(await Mediator.Send(new GetCompaniesQuery()));
        }
    }
}
