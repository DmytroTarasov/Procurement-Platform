namespace Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository CategoryRepository { get; }
        ICompanyRepository CompanyRepository { get; }
        IAddressRepository AddressRepository { get; }
        IProcurementItemRepository ProcurementItemRepository { get; }
        ISubdivisionRepository SubdivisionRepository { get; }
        IRoleRepository RoleRepository { get; }
        IRequestRepository RequestRepository { get; }
        IProposalRepository ProposalRepository { get; }
        IOrderRepository OrderRepository { get; }
        Task<bool> Complete();
    }
}
