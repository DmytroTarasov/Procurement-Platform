using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class SubdivisionConfiguration : IEntityTypeConfiguration<Subdivision>
    {
        public void Configure(EntityTypeBuilder<Subdivision> builder)
        {
            builder.Property(s => s.Title).IsRequired(true);
            builder.Property(s => s.City).IsRequired(true);
            builder.Property(s => s.Street).IsRequired(true);
            builder.Property(s => s.ZipCode).IsRequired(true);
            builder.Property(s => s.Apartment).IsRequired(false);

            builder
                .HasMany(s => s.Users)
                .WithOne(u => u.Subdivision)
                .HasForeignKey(u => u.SubdivisionId)
                .IsRequired();

            builder
                .HasMany(s => s.Requests)
                .WithOne(r => r.Subdivision)
                .HasForeignKey(r => r.SubdivisionId)
                .IsRequired();
        }
    }
}
