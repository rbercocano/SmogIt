using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;
using SmogIt.Core.Extenstions;

namespace SmogIt.Data.Context.Mapping
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("Clients");
            builder.HasKey(c => c.ClientId);
            builder.Property(c => c.ClientId).IsRequired();
            builder.Property(c => c.FirstName).IsRequired();
            builder.Property(c => c.LastName);
            builder.Property(c => c.Email).HasMaxLength(200);
            builder.Property(c => c.Phone).HasConversion(to => to.FormatAsUSPhoneNumber(), from => from).IsRequired();
            builder.Property(c => c.RegistrationDate).IsRequired().HasDefaultValueSql("GETDATE()");

            builder.HasMany(c => c.Vehicles)
                .WithOne(v => v.Client)
                .HasForeignKey(v => v.ClientId);
        }
    }
}
