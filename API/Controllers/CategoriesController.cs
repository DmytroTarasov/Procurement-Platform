using API.Helpers;
using Application.Categories;
using Domain;
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

        [AuthorizeRoles(UserRoles.Administrator)]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
