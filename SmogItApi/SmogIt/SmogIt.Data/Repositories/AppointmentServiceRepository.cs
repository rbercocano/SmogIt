using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class AppointmentServiceRepository(SmogItContext context) : IAppointmentServiceRepository
    {
        public async Task<int> AddAync(AppointmentService appointment)
        {
            var entity = await context.AppointmentServices.AddAsync(appointment);
            await context.SaveChangesAsync();
            return entity.Entity.AppointmentServiceId;
        }
        public async Task<AppointmentService?> FindAync(int appointmentServiceId)
        {
            return await context.AppointmentServices.FindAsync(appointmentServiceId);
        }
        public async Task RemoveAync(AppointmentService appointment)
        {
            context.AppointmentServices.Remove(appointment);
            await context.SaveChangesAsync();
        }
    }
}
