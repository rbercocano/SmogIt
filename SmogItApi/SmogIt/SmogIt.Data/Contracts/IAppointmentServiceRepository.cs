using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IAppointmentServiceRepository
    {
        Task AddAync(AppointmentService appointment);
    }
}
