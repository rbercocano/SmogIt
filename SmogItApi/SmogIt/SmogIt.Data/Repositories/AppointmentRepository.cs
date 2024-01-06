using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly SmogItContext _context;

        public AppointmentRepository(SmogItContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentsAsync()
        {
            return await _context.Appointments.ToListAsync();
        }

        public async Task<Appointment> GetAppointmentByIdAsync(int appointmentId)
        {
            return await _context.Appointments.FindAsync(appointmentId);
        }

        public async Task AddAppointmentAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAppointmentAsync(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
        }
    }
}
