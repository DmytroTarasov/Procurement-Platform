using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.SubdivisionId).IsRequired(false);
            builder.Property(u => u.FirstName).HasMaxLength(25);
            builder.Property(u => u.LastName).HasMaxLength(25);
            builder.Property(u => u.MiddleName).HasMaxLength(25);
            builder.Property(u => u.Email).HasMaxLength(25);
            
            builder
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
        }
    }
}
