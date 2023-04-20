using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ProcurementItemConfiguration : IEntityTypeConfiguration<ProcurementItem>
    {
        public void Configure(EntityTypeBuilder<ProcurementItem> builder)
        {
            builder.Property(p => p.Title).IsRequired();
        }
    }
}
