using System.Security.Claims;
using Application.Common.Models;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Requests
{
    public class CreateRequestCommand : IRequest<Result<int>>
    {
        public RequestDto Request { get; set; }
        public GoodDto Good { get; set; }
    }
    public class CreateRequestCommandHandler : IRequestHandler<CreateRequestCommand, Result<int>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateRequestCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(CreateRequestCommand command, CancellationToken cancellationToken)
        {
            if (command.Good != null) {
                var good = _mapper.Map<Good>(command.Good);
                _context.Goods.Add(good);
                var goodResult = await _context.SaveChangesAsync() > 0;
                if (!goodResult) return Result<int>.Failure("Не вдалось створити товар. Спробуйте, будь ласка, пізніше");
                command.Request.GoodId = good.Id;
            }

            var request = _mapper.Map<Request>(command.Request);
            request.CreatedAt = DateTime.UtcNow;
            request.SubdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            _context.Requests.Add(request);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Не вдалось створити заявку. Спробуйте, будь ласка, пізніше");

            return Result<int>.Success(request.Id);
        }
    }
}
