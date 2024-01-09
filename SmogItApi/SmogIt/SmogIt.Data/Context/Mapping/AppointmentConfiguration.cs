using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasKey(a => a.AppointmentId);
            builder.Property(a => a.AppointmentId).IsRequired();
            builder.Property(a => a.VehicleId).IsRequired();
            builder.Property(a => a.StatusId).IsRequired();
            builder.Property(a => a.AppointmentDateTime).IsRequired();
            builder.Property(a => a.Notes).HasColumnType("text");

            builder.HasOne(a => a.Vehicle)
                .WithMany(v => v.Appointments)
                .HasForeignKey(a => a.VehicleId);

            builder.HasOne(a => a.Status)
                .WithMany(s => s.Appointments)
                .HasForeignKey(a => a.StatusId);

            builder.HasMany(a => a.AppointmentServices)
                .WithOne(a => a.Appointment)
                .HasForeignKey(a => a.AppointmentID);
        }
    }
}
