using Application.Common.Helpers;
using Application.Common.Services.Interfaces;
using Application.Dtos;
using MediatR;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Application.Common.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly EmailOptions _emailOptions;

        public EmailService(IOptions<EmailOptions> emailOptions)
        {
            _emailOptions = emailOptions.Value;
        }
        public async Task<Result<Unit>> SendEmailAsync(EmailDto email)
        {
            var client = new SendGridClient(_emailOptions.ApiKey);

            var message = new SendGridMessage()
            {
                From = new EmailAddress(_emailOptions.SenderEmail, _emailOptions.SenderName),
                Subject = email.Subject,
                HtmlContent = email.HtmlContent
            };

            message.AddTos(email.Receivers.Where(re => re != null).Select(re => new EmailAddress(re)).ToList());

            message.AddAttachment("order.pdf", Convert.ToBase64String(email.FileStream));

            var response = await client.SendEmailAsync(message);

            if (!response.IsSuccessStatusCode) return Result<Unit>.Failure("Не вдалось надіслати листа");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
