using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(c => c.Title).IsRequired(true);
            
            builder 
                .HasMany(c => c.Goods)
                .WithOne(g => g.Category)
                .HasForeignKey(g => g.CategoryId)
                .IsRequired();
        }
    }
}
