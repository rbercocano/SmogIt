using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IAppointmentServiceService
    {
        Task<int> AddAync(int appointmentId, AppointmentServiceModel appointmentServiceModel);
        Task RemoveAync(int AppointmentServiceId);
    }
}