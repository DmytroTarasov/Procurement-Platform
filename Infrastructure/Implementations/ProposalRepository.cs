using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations
{
    public class ProposalRepository : Repository<Proposal>, IProposalRepository
    {
        public ProposalRepository(DataContext context) : base(context) { }

        public async Task<Proposal> GetProposalByIdWithRelationsAsync(int id)
        {
            return await GetAll()
                .Include(p => p.Order)
                .ThenInclude(o => o.Requests)
                .Include(p => p.Order)
                .ThenInclude(o => o.Proposals)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Proposal> GetAnotherSupplierProposalAsync(int orderId, int proposalId, int supplierId)
        {
            return await GetAll()
                    .FirstOrDefaultAsync(p => p.SupplierId == supplierId && p.TransporterId == null 
                    && p.Id != proposalId && p.Status == ProposalStatus.Active && p.OrderId == orderId);
        }
        
        public async Task DeleteOtherSupplierProposalsAsync(int orderId, int proposalId, int supplierId)
        {
            await GetAll()
                    .Where(p => p.SupplierId == supplierId && p.TransporterId == null 
                        && p.Id != proposalId && p.Status == ProposalStatus.Active && p.OrderId == orderId)
                    .ForEachAsync(p => Context.Proposals.Remove(p));
        }

        public async Task<IEnumerable<Address>> GetSupplierShipmentAddressesByProposalsAsync(int companyId)
        {
            return await GetAll()
                    .Include(p => p.ShipmentAddress)
                    .Include(p => p.Supplier)
                    .ThenInclude(s => s.Subdivision)
                    .Where(p => p.Supplier.Subdivision.CompanyId == companyId)
                    .Select(p => p.ShipmentAddress)
                    .Where(a => a != null)
                    .Distinct()
                    .ToListAsync();
        }
    }
}
