using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(o => o.Title).IsRequired(true);
            builder.Property(o => o.Description).IsRequired(true);

            builder
                .HasMany(o => o.Proposals)
                .WithOne(p => p.Order)
                .HasForeignKey(p => p.OrderId)
                .IsRequired();
            
            builder
                .HasMany(o => o.Requests)
                .WithOne(r => r.Order)
                .HasForeignKey(r => r.OrderId)
                .IsRequired(false);
        }
    }
}
