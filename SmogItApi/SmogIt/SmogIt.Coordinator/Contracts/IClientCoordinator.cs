
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<int> AddAsync(ClientModel client);
        Task<ClientDetailsModel?> FindAsync(int id);
        Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, ClientModel client);

        Task<int> AddVehicleAsync(VehicleModel vehicle);
        Task<PagedResult<VehicleDetailsModel>> GeVehiclestByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);


    }
}