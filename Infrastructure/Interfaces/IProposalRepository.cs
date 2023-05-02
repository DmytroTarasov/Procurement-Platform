using Domain;

namespace Infrastructure.Interfaces
{
    public interface IProposalRepository : IRepository<Proposal>
    {
        Task<Proposal> GetProposalByIdWithRelationsAsync(int id);
        Task<Proposal> GetAnotherSupplierProposalAsync(int proposalId, int supplierId);
        Task DeleteOtherSupplierProposalsAsync(int proposalId, int supplierId);
        Task<IEnumerable<Address>> GetSupplierShipmentAddressesByProposalsAsync(int companyId);
    }
}
