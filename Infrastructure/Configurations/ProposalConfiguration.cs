using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class ProposalConfiguration : IEntityTypeConfiguration<Proposal>
    {
        public void Configure(EntityTypeBuilder<Proposal> builder)
        {
            builder.Property(p => p.TransporterId).IsRequired(false);
            builder.Property(p => p.SupplierAdditionalInfo).IsRequired(false);
            builder.Property(p => p.TransporterSum).IsRequired(false);
            builder.Property(p => p.TransporterAdditionalInfo).IsRequired(false);
            builder.Property(p => p.ShipmentAddressId).IsRequired(false);
            builder.Property(p => p.Status)
                .HasConversion(ps => ps.ToString(), s => (ProposalStatus)Enum.Parse(typeof(ProposalStatus), s));
        }
    }
}
