using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class VehicleMakeConfiguration : IEntityTypeConfiguration<VehicleMake>
    {
        public void Configure(EntityTypeBuilder<VehicleMake> builder)
        {
            builder.ToTable("VehicleMake");
            builder.HasKey(v => v.MakeId);
            builder.Property(v => v.Make).IsRequired();
            builder.HasMany(v => v.VehicleModels)
                .WithOne(a => a.VehicleMake)
                .HasForeignKey(a => a.MakeId);
        }
    }
}
