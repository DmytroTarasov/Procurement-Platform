using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class CancelRequestCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
    public class CancelRequestCommandHandler : IRequestHandler<CancelRequestCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public CancelRequestCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        public async Task<Result<Unit>> Handle(CancelRequestCommand command, CancellationToken cancellationToken)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.Id == command.Id);

            if (request == null) return Result<Unit>.Failure("Заявки з таким ідентифікатором немає");

            var subdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            if (subdivisionId != request.SubdivisionId) return Result<Unit>.Forbidden();
            
            request.Status = RequestStatus.Cancelled;
            _context.Requests.Update(request);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось скасувати заявку. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
