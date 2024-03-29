using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(o => o.Title).IsRequired().HasMaxLength(100);
            builder.Property(o => o.BuyerContactPersonId).IsRequired();
            builder.Property(o => o.SupplierContactPersonId).IsRequired(false);
            builder.Property(o => o.TransporterContactPersonId).IsRequired(false);
            builder.Property(o => o.ShipmentAddressId).IsRequired(false);
            builder.Property(o => o.SupplierPrice).IsRequired(false);
            builder.Property(o => o.TransporterSum).IsRequired(false);
            builder.Property(o => o.Status)
                .HasConversion(os => os.ToString(), s => (OrderStatus)Enum.Parse(typeof(OrderStatus), s))
                .HasMaxLength(25);

            builder
                .HasMany(o => o.Proposals)
                .WithOne(p => p.Order)
                .HasForeignKey(p => p.OrderId);
            
            builder
                .HasMany(o => o.Requests)
                .WithOne(r => r.Order)
                .HasForeignKey(r => r.OrderId);
        }
    }
}
