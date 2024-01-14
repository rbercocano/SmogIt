using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class AppointmentServiceRepository(SmogItContext context) : IAppointmentServiceRepository
    {
        public async Task AddAync(AppointmentService appointment)
        {
            await context.AppointmentServices.AddAsync(appointment);
            await context.SaveChangesAsync();
        }
    }
}
