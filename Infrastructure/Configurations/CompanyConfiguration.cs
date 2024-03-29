using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(c => c.Title).IsRequired().HasMaxLength(100);
            builder.Property(c => c.Edrpou).IsRequired().HasMaxLength(8);
            builder.Property(c => c.Email).IsRequired().HasMaxLength(25);

            builder
                .HasMany(c => c.Subdivisions)
                .WithOne(d => d.Company)
                .HasForeignKey(d => d.CompanyId);
        }
    }
}
