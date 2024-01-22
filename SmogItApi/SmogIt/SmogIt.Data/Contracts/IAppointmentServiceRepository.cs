using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IAppointmentServiceRepository
    {
        Task<int> AddAync(AppointmentService appointment);
        Task<AppointmentService?> FindAync(int appointmentServiceId);
        Task RemoveAync(AppointmentService appointment);
    }
}
