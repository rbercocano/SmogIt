using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IAppointmentCoordinator
    {
        Task RemoveServiceAsync(int appointmentServiceId);
        Task<int> AddServiceAsync(int appointmentId, AppointmentServiceModel model);
        Task<PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q);
        Task<List<AppointmentDetailsModel>> GetNotCompleted();
    }
}
