using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class AppointmentServiceService(IAppointmentServiceRepository appointmentServiceRepository) : IAppointmentServiceService
    {
        public async Task AddAync(int appointmentId,AppointmentServiceModel appointmentServiceModel)
        {
            await appointmentServiceRepository.AddAync(new Models.Entities.AppointmentService
            {
                AppointmentId = appointmentId,
                ServiceId = appointmentServiceModel.ServiceId,
                Price = appointmentServiceModel.Price,
            });
        }
    }
}
