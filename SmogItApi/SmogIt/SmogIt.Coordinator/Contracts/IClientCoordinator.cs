
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IClientCoordinator
    {
        Task<int> AddAsync(ClientModel client);
        Task<ClientDetailsModel?> FindAsync(int id);
        Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, ClientModel client);

        Task<int> AddVehicleAsync(VehicleModel vehicle);
        Task<PagedResult<VehicleDetailsModel>> GeVehiclesByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);
        Task<int> AddAppointmentAsync(AppointmentModel vehicle);
        Task<PagedResult<AppointmentDetailsModel>> GeAppointmentsByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);
    }
}