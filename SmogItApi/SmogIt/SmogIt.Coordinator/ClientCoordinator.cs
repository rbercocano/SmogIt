using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ClientCoordinator(IClientService clientService, IVehicleService vehicleService) : IClientCoordinator
    {

        public async Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            return await clientService.GetClientsAsync(pageSize, page, sortBy, direction, q);
        }
        public async Task<int> AddAsync(ClientModel client)
        {
            return await clientService.AddAsync(client);
        }
        public async Task UpdateAsync(int id, ClientModel client) => await clientService.UpdateAsync(id, client);
        public async Task<ClientDetailsModel?> FindAsync(int id) => await clientService.FindAsync(id);

        public async Task<int> AddVehicleAsync(VehicleModel vehicle)
        {
            return await vehicleService.AddAsync(vehicle);
        }
        public async Task<PagedResult<VehicleDetailsModel>> GeVehiclestByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q)
        {
            return await vehicleService.GetByClientAsync(clientId, pageSize, page, sortBy, direction, q);
        }
    }
}
