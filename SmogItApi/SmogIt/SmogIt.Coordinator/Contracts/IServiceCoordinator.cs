using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IServiceCoordinator
    {
        Task<List<ServiceModel>> GetAllAsync();
    }
}
