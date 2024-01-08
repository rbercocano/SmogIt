
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<int> AddAsync(ClientModel client);
        Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, ClientModel client);
    }
}