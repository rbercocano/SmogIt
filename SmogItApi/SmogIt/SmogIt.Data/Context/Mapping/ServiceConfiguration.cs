using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.ToTable("Services");
            builder.HasKey(s => s.ServiceId);
            builder.Property(s => s.ServiceId).IsRequired();
            builder.Property(s => s.ServiceName).IsRequired().HasColumnType("VARCHAR(100)");
            builder.Property(s => s.Description).HasColumnType("VARCHAR(200)").IsRequired(false);
            builder.Property(s => s.Price).IsRequired().HasColumnType("DECIMAL(10,2)");

            builder.HasMany(s => s.AppointmentServices)
                .WithOne(a => a.Service)
                .HasForeignKey(a => a.ServiceId);
        }
    }
}
