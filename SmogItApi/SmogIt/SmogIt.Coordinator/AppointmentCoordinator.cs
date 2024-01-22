using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class AppointmentCoordinator(IServiceService serviceService, IAppointmentService appointmentService, IAppointmentServiceService appointmentServiceService) : IAppointmentCoordinator
    {
        public async Task<int> AddServiceAsync(int appointmentId, AppointmentServiceModel model)
        {
            var service = await serviceService.FindAsync(model.ServiceId);
            model.OriginalPrice = service.Price;
            return await appointmentServiceService.AddAync(appointmentId, model);
        }

        public async Task RemoveServiceAsync(int appointmentServiceId)
        {
            await appointmentServiceService.RemoveAync(appointmentServiceId);
        }

        public async Task<Core.Domains.PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q) => await appointmentService.SearchAsync(pageSize, page, sortBy, direction, q);


        public async Task<List<AppointmentDetailsModel>> GetNotCompleted() => await appointmentService.GetNotCompleted();
    }
}
