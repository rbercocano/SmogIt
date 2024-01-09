using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.ToTable("Vehicles");
            builder.HasKey(v => v.VehicleId);
            builder.Property(v => v.VehicleId).IsRequired();
            builder.Property(v => v.ClientId).IsRequired();
            builder.Property(v => v.VehicleMake).IsRequired();
            builder.Property(v => v.VehicleModel).IsRequired();
            builder.Property(v => v.LicensePlate);
            builder.HasMany(v => v.Appointments)
                .WithOne(a => a.Vehicle)
                .HasForeignKey(a => a.VehicleId);

            builder.HasOne(v => v.Client)
                .WithMany(c => c.Vehicles)
                .HasForeignKey(v => v.ClientId);
        }
    }
}
