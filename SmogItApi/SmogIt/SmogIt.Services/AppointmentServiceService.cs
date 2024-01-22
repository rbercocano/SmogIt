using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class AppointmentServiceService(IAppointmentServiceRepository appointmentServiceRepository) : IAppointmentServiceService
    {
        public async Task<int> AddAync(int appointmentId, AppointmentServiceModel appointmentServiceModel)
        {
            return await appointmentServiceRepository.AddAync(new Models.Entities.AppointmentService
            {
                AppointmentId = appointmentId,
                ServiceId = appointmentServiceModel.ServiceId,
                Price = appointmentServiceModel.Price,
                OriginalPrice = appointmentServiceModel.OriginalPrice
            });
        }
        public async Task RemoveAync(int AppointmentServiceId)
        {
            var appt = await appointmentServiceRepository.FindAync(AppointmentServiceId);
            if (appt == null) return;
            await appointmentServiceRepository.RemoveAync(appt);
        }
    }
}
