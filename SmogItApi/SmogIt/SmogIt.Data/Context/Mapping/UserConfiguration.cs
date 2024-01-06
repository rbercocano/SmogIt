using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.UserId).IsRequired();
            builder.Property(u => u.FirstName).IsRequired();
            builder.Property(u => u.LastName);
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.Password);
            builder.Property(u => u.CreatedAt);
            builder.HasIndex(u => u.Email).IsUnique();
        }
    }
}
