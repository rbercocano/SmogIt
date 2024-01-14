using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IStatusCoordinator
    {
        Task<List<StatusModel>> GetAllAsync();
    }
}
