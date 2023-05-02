using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class RequestConfiguration : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.Property(r => r.Description).IsRequired();
            builder.Property(r => r.OrderId).IsRequired(false);
            builder.Property(r => r.Quantity).IsRequired(false);
            builder.Property(r => r.MeasurementUnit).IsRequired(false);

            builder.Property(r => r.MeasurementUnit)
                .HasConversion(mu => mu.ToString(), s => (MeasurementUnit)Enum.Parse(typeof(MeasurementUnit), s));
            
            builder.Property(r => r.Status)
                .HasConversion(rs => rs.ToString(), s => (RequestStatus)Enum.Parse(typeof(RequestStatus), s));
        }
    }
}
