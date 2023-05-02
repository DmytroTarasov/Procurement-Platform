using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Orders
{
    public class CancelOrderCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
    public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _uof;
        public CancelOrderCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof) {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
        }
        public async Task<Result<Unit>> Handle(CancelOrderCommand command, CancellationToken cancellationToken)
        {
            var order = await _uof.OrderRepository.GetOrderByIdWithRequestsAsync(command.Id);

            if (order == null) return Result<Unit>.Failure("Замовлення з таким ідентифікатором немає");

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (userId != order.BuyerContactPersonId) return Result<Unit>.Forbidden();
            
            order.Status = OrderStatus.Cancelled;

            order.Requests.ToList().ForEach(r => {
                r.Status = RequestStatus.Active;
            });

            _uof.OrderRepository.Update(order);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось скасувати замовлення. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
