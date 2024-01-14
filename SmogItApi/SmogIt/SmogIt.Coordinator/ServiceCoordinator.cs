using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ServiceCoordinator(IServiceService serviceService) : IServiceCoordinator
    {
        public async Task<List<ServiceModel>> GetAllAsync() => await serviceService.GetAllAsync();
    }
}
