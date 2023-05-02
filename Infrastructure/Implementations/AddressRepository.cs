using Domain;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class AddressRepository : Repository<Address>, IAddressRepository
    {
        public AddressRepository(DataContext context) : base(context) { }
    }
}
