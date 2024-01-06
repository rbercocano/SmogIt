using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class AppointmentServiceConfiguration : IEntityTypeConfiguration<AppointmentService>
    {
        public void Configure(EntityTypeBuilder<AppointmentService> builder)
        {
            builder.HasKey(a => new { a.AppointmentID, a.ServiceID });

            builder.Property(a => a.AppointmentID).IsRequired();
            builder.Property(a => a.ServiceID).IsRequired();

            builder.HasOne(a => a.Appointment)
                .WithMany(a => a.AppointmentServices)
                .HasForeignKey(a => a.AppointmentID);

            builder.HasOne(a => a.Service)
                .WithMany(s => s.AppointmentServices)
                .HasForeignKey(a => a.ServiceID);
        }
    }
}
