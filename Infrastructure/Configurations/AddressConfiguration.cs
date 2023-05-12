using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.Property(c => c.City).IsRequired().HasMaxLength(25);
            builder.Property(c => c.Region).IsRequired(false).HasMaxLength(25);
            builder.Property(c => c.Street).IsRequired().HasMaxLength(50);
            builder.Property(c => c.BuildingNumber).IsRequired(false).HasMaxLength(5);
            builder.Property(c => c.ZipCode).IsRequired().HasMaxLength(5);
        }
    }
}
