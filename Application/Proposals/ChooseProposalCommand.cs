using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Proposals
{
    public class ChooseProposalCommand : IRequest<Result<Unit>>
    {
        public int ProposalId { get; set; }
    }

    public class ChooseProposalCommandHandler : IRequestHandler<ChooseProposalCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IDocumentGeneratorService _documentService;
        private readonly IEmailService _emailService;
        public ChooseProposalCommandHandler(DataContext context, IMapper mapper, IDocumentGeneratorService documentService, IEmailService emailService) {
            _context = context;
            _mapper = mapper;
            _documentService = documentService;
            _emailService = emailService;
        }
        public async Task<Result<Unit>> Handle(ChooseProposalCommand command, CancellationToken cancellationToken)
        {   
            var proposal = await _context.Proposals
                .Include(p => p.Order)
                .ThenInclude(o => o.Requests)
                .Include(p => p.Order)
                .ThenInclude(o => o.Proposals)
                .FirstOrDefaultAsync(p => p.Id == command.ProposalId);

            if (proposal == null) return Result<Unit>.Failure("Такої пропозиції не існує");

            var order = proposal.Order;
            
            order.SupplierContactPersonId = proposal.SupplierId;
            order.TransporterContactPersonId = proposal.TransporterId;
            order.ShipmentAddressId = proposal.ShipmentAddressId;
            order.SupplierPrice = proposal.SupplierPrice;
            order.TransporterSum = proposal.TransporterSum;
            order.Status = OrderStatus.Processed;
            order.Requests.ToList().ForEach(r => r.Status = RequestStatus.Processed);
            order.Proposals.ToList().ForEach(p => p.Status = ProposalStatus.Processed);

            _context.Orders.Update(order);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

            var orderDto = await _context.Orders
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(o => o.Id == proposal.OrderId);

            var documentResult = _documentService.GenerateDocument(orderDto);

            if (!documentResult.IsSuccess) return Result<Unit>.Failure(documentResult.Error);

            var email = new EmailDto {
                Subject = $"Замовлення №{order.Id}", 
                // Receivers = new List<string> { "dtarasov892@gmail.com", "dtarasov890@gmail.com" },
                Receivers = new List<string> { "dtarasov892@gmail.com" },
                HtmlContent = $"Вітаємо! <br> Вашу пропозицію на замовлення №{order.Id} «{order.Title}» було обрано замовником. <br> Деталі Ви можете переглянути у вкладеному файлі.",
                FileStream = documentResult.Value
            };

            var emailResult = await _emailService.SendEmailAsync(email);

            if (!emailResult.IsSuccess) return emailResult;

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
