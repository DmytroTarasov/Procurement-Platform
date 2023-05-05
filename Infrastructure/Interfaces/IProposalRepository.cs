using Domain;

namespace Infrastructure.Interfaces
{
    public interface IProposalRepository : IRepository<Proposal>
    {
        Task<Proposal> GetProposalByIdWithRelationsAsync(int id);
        Task<Proposal> GetAnotherSupplierProposalAsync(int orderId, int proposalId, int supplierId);
        Task DeleteOtherSupplierProposalsAsync(int orderId, int proposalId, int supplierId);
        Task<IEnumerable<Address>> GetSupplierShipmentAddressesByProposalsAsync(int companyId);
    }
}
