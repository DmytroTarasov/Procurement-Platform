using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

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
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        public CreateOrderCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
        {   
            if (command.DeliveryAddress != null) {
                var address = _mapper.Map<Address>(command.DeliveryAddress);
                _uof.AddressRepository.Add(address);
                var addressResult = await _uof.Complete();
                if (!addressResult) return Result<Unit>.Failure("Не вдалось додати адресу доставки. Спробуйте, будь ласка, пізніше");
                command.DeliveryAddressId = address.Id;
            }

            var userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var requests = await _uof.RequestRepository.GetByCondition(r => command.RequestIds.Contains(r.Id)).ToListAsync();

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

            _uof.OrderRepository.Add(order);

            requests.ForEach(r => {
                r.Status = RequestStatus.AddedToOrder;
            });

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось створити замовлення. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
