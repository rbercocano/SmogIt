using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Services.Contracts
{
    public interface IClientService
    {
        Task<int> AddAsync(ClientModel client);
        Task<PagedResult<ClientDetailsModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
    }
}