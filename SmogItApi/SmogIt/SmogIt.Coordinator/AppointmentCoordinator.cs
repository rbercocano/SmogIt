using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class AppointmentCoordinator(IAppointmentService appointmentService) : IAppointmentCoordinator
    {
        public async Task<Core.Domains.PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q) => await appointmentService.SearchAsync(pageSize, page, sortBy, direction, q);
    }
}
