using SmogIt.Coordinator.Contracts;
using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ClientCoordinator : IClientCoordinator
    {
        private readonly IClientService clientService;

        public ClientCoordinator(IClientService clientService)
        {
            this.clientService = clientService;
        }
        public async Task<PagedResult<ClientModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            return await clientService.GetclientsAsync(pageSize, page, sortBy, direction, q);
        }
    }
}
