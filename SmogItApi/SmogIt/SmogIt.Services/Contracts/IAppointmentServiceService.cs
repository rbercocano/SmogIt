using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IAppointmentServiceService
    {
        Task AddAync(int appointmentId, AppointmentServiceModel appointmentServiceModel);
    }
}