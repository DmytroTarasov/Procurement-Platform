using System.Security.Claims;
using Application.Common.Helpers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class CancelOrderCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }
    public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public CancelOrderCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        public async Task<Result<int>> Handle(CancelOrderCommand command, CancellationToken cancellationToken)
        {
            var order = await _context.Orders.Include(o => o.Requests).FirstOrDefaultAsync(r => r.Id == command.Id);

            if (order == null) return Result<int>.Failure("Такого замовлення не існує");

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (userId != order.BuyerContactPersonId) return Result<int>.Forbidden();
            
            order.Status = OrderStatus.Cancelled;

            order.Requests.ToList().ForEach(r => {
                r.Status = RequestStatus.Active;
            });

            _context.Orders.Update(order);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось скасувати замовлення. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(order.Id);
        }
    }
}
