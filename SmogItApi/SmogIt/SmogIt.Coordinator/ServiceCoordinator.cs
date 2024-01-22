using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ServiceCoordinator(IServiceService serviceService) : IServiceCoordinator
    {
        public async Task<List<ServiceDetailsModel>> GetAllAsync() => await serviceService.GetAllAsync();

        public async Task<int> AddAsync(ServiceModel service) => await serviceService.AddAsync(service);

        public async Task UpdateAsync(int id,ServiceModel service) => await serviceService.UpdateAsync(id,service);
    }
}
