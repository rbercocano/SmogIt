using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.HasKey(s => s.ServiceId);
            builder.Property(s => s.ServiceId).IsRequired();
            builder.Property(s => s.ServiceName).IsRequired();
            builder.Property(s => s.Description).HasColumnType("text");
            builder.Property(s => s.Price).IsRequired();

            builder.HasMany(s => s.AppointmentServices)
                .WithOne(a => a.Service)
                .HasForeignKey(a => a.ServiceID);
        }
    }
}
