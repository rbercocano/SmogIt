using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<int> AddAsync(ClientModel client);
        Task<PagedResult<ClientDetailsModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
    }
}