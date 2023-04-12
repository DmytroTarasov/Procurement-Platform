using Application.Companies;
using Application.Dtos;
using Application.Subdivisions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCompanies() {
            return HandleResult(await Mediator.Send(new GetCompaniesQuery()));
        }
        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyDto companyDto) {
            return HandleResult(await Mediator.Send(new CreateCompanyCommand { Company = companyDto }));
        }
        [HttpPost("{id}/subdivisions")]
        public async Task<IActionResult> CreateCompanySubdivision(int id, [FromBody] SubdivisionDto subdivisionDto) {
            return HandleResult(await Mediator.Send(new CreateSubdivisionCommand { Subdivision = subdivisionDto, CompanyId = id }));
        }
    }
}
