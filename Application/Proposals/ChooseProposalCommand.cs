using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Interfaces;

namespace Application.Proposals
{
    public class ChooseProposalCommand : IRequest<Result<Unit>>
    {
        public int ProposalId { get; set; }
    }

    public class ChooseProposalCommandHandler : IRequestHandler<ChooseProposalCommand, Result<Unit>>
    {
        private readonly IUnitOfWork _uof;
        private readonly IMapper _mapper;
        private readonly IDocumentGeneratorService _documentService;
        private readonly IEmailService _emailService;
        public ChooseProposalCommandHandler(IUnitOfWork uof, IMapper mapper, 
            IDocumentGeneratorService documentService, IEmailService emailService) {
            _uof = uof;
            _mapper = mapper;
            _documentService = documentService;
            _emailService = emailService;
        }
        public async Task<Result<Unit>> Handle(ChooseProposalCommand command, CancellationToken cancellationToken)
        {   
            var proposal = await _uof.ProposalRepository.GetProposalByIdWithRelationsAsync(command.ProposalId);

            if (proposal == null) return Result<Unit>.Failure("Пропозиції з таким ідентифікатором немає");

            var order = proposal.Order;
            
            order.SupplierContactPersonId = proposal.SupplierId;
            order.TransporterContactPersonId = proposal.TransporterId;
            order.ShipmentAddressId = proposal.ShipmentAddressId;
            order.SupplierPrice = proposal.SupplierPrice;
            order.TransporterSum = proposal.TransporterSum;
            order.Status = OrderStatus.Processed;
            order.Requests.ToList().ForEach(r => r.Status = RequestStatus.Processed);
            order.Proposals.ToList().ForEach(p => p.Status = ProposalStatus.Processed);

            _uof.OrderRepository.Update(order);

            var result = await _uof.Complete();

            if (!result) return Result<Unit>.Failure("Не вдалось подати пропозицію. Спробуйте, будь ласка, пізніше");

            var orderDto = await _uof.OrderRepository.GetAll()
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(o => o.Id == proposal.OrderId);

            var documentResult = _documentService.GenerateDocument(orderDto);

            if (!documentResult.IsSuccess) return Result<Unit>.Failure(documentResult.Error);

            var email = new EmailDto {
                Subject = $"Замовлення №{order.Id}", 
                // Receivers = new List<string> { order.SupplierContactPerson.Email, order.TransporterContactPerson?.Email },
                Receivers = new List<string> { "dtarasov892@gmail.com" },
                HtmlContent = $"Вітаємо! <br> Вашу пропозицію на замовлення №{order.Id} «{order.Title}» було обрано замовником." + 
                    "<br> Деталі Ви можете переглянути у вкладеному файлі.",
                FileStream = documentResult.Value
            };

            var emailResult = await _emailService.SendEmailAsync(email);

            if (!emailResult.IsSuccess) return emailResult;

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
