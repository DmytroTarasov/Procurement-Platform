using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(c => c.Title).IsRequired(true);
            builder.Property(c => c.Edrpou).IsRequired(true);
            builder.Property(c => c.City).IsRequired(true);
            builder.Property(c => c.Street).IsRequired(true);
            builder.Property(c => c.ZipCode).IsRequired(true);
            builder.Property(c => c.Apartment).IsRequired(false);

            builder
                .HasMany(c => c.Subdivisions)
                .WithOne(d => d.Company)
                .HasForeignKey(d => d.CompanyId)
                .IsRequired();
        }
    }
}
