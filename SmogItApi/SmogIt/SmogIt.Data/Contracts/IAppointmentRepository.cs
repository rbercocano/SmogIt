using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<Appointment>> GetAllAppointmentsAsync();
        Task<Appointment> GetAppointmentByIdAsync(int appointmentId);
        Task AddAppointmentAsync(Appointment appointment);
        Task UpdateAppointmentAsync(Appointment appointment);
    }
}
