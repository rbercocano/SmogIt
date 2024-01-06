using SmogIt.Models.Core;
using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IClientService
    {
        Task<PagedResult<ClientModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
    }
}