using System.Security.Claims;
using Application.Common.Models;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class EditRequestCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Budget { get; set; }
    }
    public class EditRequestCommandHandler : IRequestHandler<EditRequestCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EditRequestCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(EditRequestCommand command, CancellationToken cancellationToken)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.Id == command.Id);

            if (request == null) return Result<int>.Failure("Такої заявки не існує");

            var subdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            if (subdivisionId != request.SubdivisionId) Result<int>.Forbidden("Такої заявки не існує");
            
            request.Description = command.Description;
            request.Quantity = command.Quantity;
            request.Budget = command.Budget;

            _context.Requests.Update(request);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось редагувати заявку. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(request.Id);
        }
    }
}
