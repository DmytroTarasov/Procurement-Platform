using System.Security.Claims;
using Application.Common.Helpers;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Infrastructure.Interfaces;

namespace Application.Requests
{
    public class EditRequestCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Budget { get; set; }
    }
    public class EditRequestCommandHandler : IRequestHandler<EditRequestCommand, Result<Unit>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        public EditRequestCommandHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork uof, IMapper mapper) {
            _httpContextAccessor = httpContextAccessor;
            _uof = uof;
            _mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(EditRequestCommand command, CancellationToken cancellationToken)
        {
            var request = await _uof.RequestRepository.GetByIdAsync(command.Id);

            if (request == null) return Result<Unit>.Failure("Заявки з таким ідентифікатором немає");

            var subdivisionId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("subdivisionId"));

            if (subdivisionId != request.SubdivisionId) return Result<Unit>.Forbidden();
            
            request.Description = command.Description;
            request.Quantity = command.Quantity;
            request.Budget = command.Budget;

            _uof.RequestRepository.Update(request);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось редагувати заявку. Спробуйте, будь ласка, пізніше");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
