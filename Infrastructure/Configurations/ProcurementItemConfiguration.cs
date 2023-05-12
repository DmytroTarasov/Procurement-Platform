using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class ProcurementItemConfiguration : IEntityTypeConfiguration<ProcurementItem>
    {
        public void Configure(EntityTypeBuilder<ProcurementItem> builder)
        {
            builder.Property(p => p.Title).IsRequired().HasMaxLength(100);
        }
    }
}
