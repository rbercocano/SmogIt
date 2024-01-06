using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context.Mapping
{
    public class StatusConfiguration : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> builder)
        {
            builder.HasKey(s => s.StatusId);

            builder.Property(s => s.StatusId).IsRequired();
            builder.Property(s => s.StatusName);

            builder.HasMany(s => s.Appointments)
                .WithOne(a => a.Status)
                .HasForeignKey(a => a.StatusId);
        }
    }
}
