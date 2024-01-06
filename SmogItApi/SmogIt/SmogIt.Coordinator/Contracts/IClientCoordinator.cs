using SmogIt.Models.Core;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<PagedResult<ClientModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
    }
}