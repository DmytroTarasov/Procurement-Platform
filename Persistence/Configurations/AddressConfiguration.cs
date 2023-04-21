using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.Property(c => c.City).IsRequired();
            builder.Property(c => c.Street).IsRequired();
            builder.Property(c => c.ZipCode).IsRequired();
            builder.Property(c => c.BuildingNumber).IsRequired(false);
            builder.Property(c => c.Region).IsRequired(false);
        }
    }
}
