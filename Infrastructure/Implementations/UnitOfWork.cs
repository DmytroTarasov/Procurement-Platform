using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool _disposed = false;
        private DataContext _context;
        public ICategoryRepository CategoryRepository { get; }
        public ICompanyRepository CompanyRepository { get; }
        public IAddressRepository AddressRepository { get; }
        public IProcurementItemRepository ProcurementItemRepository { get; }
        public ISubdivisionRepository SubdivisionRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IRequestRepository RequestRepository { get; }
        public IProposalRepository ProposalRepository { get; }
        public IOrderRepository OrderRepository { get; }

        public UnitOfWork(DataContext context, ICategoryRepository categoryRepository, ICompanyRepository companyRepository,
            IAddressRepository addressRepository, IProcurementItemRepository procurementItemRepository,
            ISubdivisionRepository subdivisionRepository, IRoleRepository roleRepository, IRequestRepository requestRepository,
            IProposalRepository proposalRepository, IOrderRepository orderRepository)
        {
            _context = context;
            CategoryRepository = categoryRepository;
            CompanyRepository = companyRepository;
            AddressRepository = addressRepository;
            ProcurementItemRepository = procurementItemRepository;
            SubdivisionRepository = subdivisionRepository;
            RoleRepository = roleRepository;
            RequestRepository = requestRepository;
            ProposalRepository = proposalRepository;
            OrderRepository = orderRepository;
        }
        
        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this._disposed = true;
        }
    }
}
