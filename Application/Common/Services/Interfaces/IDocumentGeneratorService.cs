using Application.Common.Helpers;
using Application.Dtos;

namespace Application.Common.Services.Interfaces
{
    public interface IDocumentGeneratorService
    {
        Result<byte[]> GenerateDocument(OrderDto order);
    }
}
