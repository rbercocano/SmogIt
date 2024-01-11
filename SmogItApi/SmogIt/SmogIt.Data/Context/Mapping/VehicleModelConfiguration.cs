using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class VehicleModelConfiguration : IEntityTypeConfiguration<VehicleModel>
    {
        public void Configure(EntityTypeBuilder<VehicleModel> builder)
        {
            builder.ToTable("VehicleModel");
            builder.HasKey(v => v.ModelId);
            builder.Property(v => v.Model).IsRequired();

            builder.HasOne(v => v.VehicleMake)
                .WithMany(c => c.VehicleModels)
                .HasForeignKey(v => v.MakeId);

            builder.HasMany(v => v.Vehicles)
                .WithOne(a => a.VehicleModel)
                .HasForeignKey(a => a.ModelId);
        }
    }
}
