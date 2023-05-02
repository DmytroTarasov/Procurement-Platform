using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Requests
{
    public class CancelRequestCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
    public class CancelRequestCommandHandler : IRequestHandler<CancelRequestCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _uof;
        public CancelRequestCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof) {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
        }
        public async Task<Result<Unit>> Handle(CancelRequestCommand command, CancellationToken cancellationToken)
        {
            var request = await _uof.RequestRepository.GetByIdAsync(command.Id); 

            if (request == null) return Result<Unit>.Failure("Заявки з таким ідентифікатором немає");

            var subdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            if (subdivisionId != request.SubdivisionId) return Result<Unit>.Forbidden();
            
            request.Status = RequestStatus.Cancelled;
            _uof.RequestRepository.Update(request);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось скасувати заявку. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
