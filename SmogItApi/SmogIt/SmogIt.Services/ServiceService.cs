using SmogIt.Data.Contracts;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class ServiceService(IServiceRepository serviceRepository): IServiceService
    {
    }
}
