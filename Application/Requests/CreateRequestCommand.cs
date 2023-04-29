using System.Security.Claims;
using Application.Common.Helpers;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Requests
{
    public class CreateRequestCommand : IRequest<Result<Unit>>
    {
        public RequestDto Request { get; set; }
        public ProcurementItemDto ProcurementItem { get; set; }
    }
    public class CreateRequestCommandHandler : IRequestHandler<CreateRequestCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CreateRequestCommandHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(CreateRequestCommand command, CancellationToken cancellationToken)
        {
            if (command.ProcurementItem != null) {
                var procurementItem = _mapper.Map<ProcurementItem>(command.ProcurementItem);
                _context.ProcurementItems.Add(procurementItem);
                var procurementItemResult = await _context.SaveChangesAsync() > 0;
                if (!procurementItemResult) return Result<Unit>.Failure("Не вдалось створити предмет закупівлі. Спробуйте, будь ласка, пізніше");
                command.Request.ProcurementItemId = procurementItem.Id;
            }

            var request = _mapper.Map<Request>(command.Request);
            request.CreatedAt = DateTime.UtcNow;
            request.SubdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            _context.Requests.Add(request);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось створити заявку. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
