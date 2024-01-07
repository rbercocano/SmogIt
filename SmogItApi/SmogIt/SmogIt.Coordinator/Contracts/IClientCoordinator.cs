using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<int> AddAsync(ClientModel client);
        Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, ClientModel client);
    }
}