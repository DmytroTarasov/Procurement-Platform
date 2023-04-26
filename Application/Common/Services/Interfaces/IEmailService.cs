using Application.Common.Helpers;
using Application.Dtos;
using MediatR;

namespace Application.Common.Services.Interfaces
{
    public interface IEmailService
    {
        Task<Result<Unit>> SendEmailAsync(EmailDto email);
    }
}
