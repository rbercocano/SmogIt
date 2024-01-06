
using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context.Mapping;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Context
{

    public class SmogItContext : DbContext
    {
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AppointmentService> AppointmentServices { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new AppointmentServiceConfiguration());
            modelBuilder.ApplyConfiguration(new ClientConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceConfiguration());
            modelBuilder.ApplyConfiguration(new StatusConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleConfiguration());
        }
    }

}
