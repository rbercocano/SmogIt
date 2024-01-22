using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IServiceCoordinator
    {
        Task<int> AddAsync(ServiceModel service);
        Task<List<ServiceDetailsModel>> GetAllAsync();
        Task UpdateAsync(int id, ServiceModel service);
    }
}
