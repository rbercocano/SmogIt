using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IAppointmentCoordinator
    {
        Task<PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q);
    }
}
