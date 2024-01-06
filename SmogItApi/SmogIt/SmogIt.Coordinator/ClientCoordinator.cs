using SmogIt.Coordinator.Contracts;
using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ClientCoordinator(IClientService clientService) : IClientCoordinator
    {

        public async Task<PagedResult<ClientDetailsModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            return await clientService.GetclientsAsync(pageSize, page, sortBy, direction, q);
        }
        public async Task<int> AddAsync(ClientModel client) => await clientService.AddAsync(client);
    }
}
