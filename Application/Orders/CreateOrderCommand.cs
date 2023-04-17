using Application.Common.Models;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class CreateOrderCommand : IRequest<Result<int>>
    {
        public string Title { get; set; }
        public ICollection<int> RequestIds { get; set; }
    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateOrderCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
        {   
            var requests = await _context.Requests.Where(r => command.RequestIds.Contains(r.Id)).ToListAsync();

            if (requests.Count == 0) 
                return Result<int>.Failure("Замовлення не може бути створене, оскільки до нього не входить жодна заявка");

            var order = new Order {
                Title = command.Title,
                CreatedAt = DateTime.UtcNow,
                Requests = requests,
                Budget = requests.Sum(r => r.Budget)
            };

            _context.Orders.Add(order);

            requests.ForEach(r => {
                r.Status = RequestStatus.AddedToOrder;
            });

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось створити замовлення. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(order.Id);
        }
    }
}
