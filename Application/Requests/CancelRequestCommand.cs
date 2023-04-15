using System.Security.Claims;
using Application.Common.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class CancelRequestCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }
    public class CancelRequestCommandHandler : IRequestHandler<CancelRequestCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public CancelRequestCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        public async Task<Result<int>> Handle(CancelRequestCommand command, CancellationToken cancellationToken)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.Id == command.Id);

            if (request == null) return Result<int>.Failure("Такої заявки не існує");

            var subdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            if (subdivisionId != request.SubdivisionId) return Result<int>.Forbidden();
            
            request.Status = RequestStatus.Cancelled;
            _context.Requests.Update(request);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось скасувати заявку. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(request.Id);
        }
    }
}
