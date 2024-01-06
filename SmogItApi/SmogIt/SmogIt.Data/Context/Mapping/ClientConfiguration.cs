using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

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
            builder.Property(c => c.Phone).IsRequired();
            builder.Property(c => c.RegistrationDate).IsRequired();

            builder.HasMany(c => c.Appointments)
                .WithOne(a => a.Client)
                .HasForeignKey(a => a.ClientId);

            builder.HasMany(c => c.Vehicles)
                .WithOne(v => v.Client)
                .HasForeignKey(v => v.ClientId);
        }
    }
}
