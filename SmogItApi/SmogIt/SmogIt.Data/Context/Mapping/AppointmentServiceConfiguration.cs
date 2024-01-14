using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class AppointmentServiceConfiguration : IEntityTypeConfiguration<AppointmentService>
    {
        public void Configure(EntityTypeBuilder<AppointmentService> builder)
        {
            builder.ToTable("AppointmentServices");
            builder.HasKey(a => a.AppointmentServiceId);
            builder.Property(a => a.AppointmentServiceId).IsRequired();
            builder.Property(a => a.AppointmentId).IsRequired();
            builder.Property(a => a.ServiceId).IsRequired();
            builder.Property(a => a.Price).IsRequired().HasColumnType("DECIMAL(10,2)");

            builder.HasOne(a => a.Appointment)
                .WithMany(a => a.AppointmentServices)
                .HasForeignKey(a => a.AppointmentId);

            builder.HasOne(a => a.Service)
                .WithMany(s => s.AppointmentServices)
                .HasForeignKey(a => a.ServiceId);
        }
    }
}
