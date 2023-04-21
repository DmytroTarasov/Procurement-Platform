using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(c => c.Title).IsRequired();
            builder.Property(c => c.Edrpou).IsRequired();

            builder
                .HasMany(c => c.Subdivisions)
                .WithOne(d => d.Company)
                .HasForeignKey(d => d.CompanyId);
        }
    }
}
