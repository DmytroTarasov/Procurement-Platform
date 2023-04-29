using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class CreateOrderCommand : IRequest<Result<Unit>>
    {
        public string Title { get; set; }
        public ICollection<int> RequestIds { get; set; }
        public int DeliveryAddressId { get; set; }
        public AddressDto DeliveryAddress { get; set; }
    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateOrderCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
        {   
            if (command.DeliveryAddress != null) {
                var address = _mapper.Map<Address>(command.DeliveryAddress);
                _context.Addresses.Add(address);
                var addressResult = await _context.SaveChangesAsync() > 0;
                if (!addressResult) return Result<Unit>.Failure("Не вдалось додати адресу доставки. Спробуйте, будь ласка, пізніше");
                command.DeliveryAddressId = address.Id;
            }

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var requests = await _context.Requests.Where(r => command.RequestIds.Contains(r.Id)).ToListAsync();

            if (requests.Count == 0) 
                return Result<Unit>.Failure("Замовлення не може бути створене, оскільки до нього не входить жодна заявка");

            var order = new Order {
                Title = command.Title,
                CreatedAt = DateTime.UtcNow,
                Requests = requests,
                Budget = requests.Sum(r => r.Budget),
                BuyerContactPersonId = userId,
                DeliveryAddressId = command.DeliveryAddressId
            };

            _context.Orders.Add(order);

            requests.ForEach(r => {
                r.Status = RequestStatus.AddedToOrder;
            });

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось створити замовлення. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
