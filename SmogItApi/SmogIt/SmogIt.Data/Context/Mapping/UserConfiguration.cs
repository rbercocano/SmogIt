using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;
using SmogIt.Core.Extenstions;

namespace SmogIt.Data.Context.Mapping
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.UserId).IsRequired();
            builder.Property(u => u.FirstName).IsRequired();
            builder.Property(u => u.LastName);
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.Active).IsRequired();
            builder.Property(u => u.CreatedAt).HasDefaultValueSql("GETDATE()");
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(c => c.Password).HasConversion(to => to.Hash(), from => from).IsRequired();
        }
    }
}
