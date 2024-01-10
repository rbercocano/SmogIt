using SmogIt.Data.Contracts;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class AppointmentServiceService(IAppointmentServiceRepository appointmentServiceRepository): IAppointmentServiceService
    {
    }
}
