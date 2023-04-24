using Application.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories() {
            return HandleResult(await Mediator.Send(new GetCategoriesQuery()));
        }
    }
}
