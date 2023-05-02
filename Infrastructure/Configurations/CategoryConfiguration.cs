using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(c => c.Title).IsRequired();

            builder.Property(c => c.Type)
                .HasConversion(ct => ct.ToString(), s => (CategoryType)Enum.Parse(typeof(CategoryType), s));
            
            builder 
                .HasMany(c => c.ProcurementItems)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId);
        }
    }
}
