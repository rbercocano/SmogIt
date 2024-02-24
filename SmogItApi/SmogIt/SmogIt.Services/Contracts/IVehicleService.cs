using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IVehicleService
    {
        Task<int> AddAsync(VehicleModel vehicle);
        Task<List<VehicleDetailsModel>> GetAllByClientAsync(int clientId);
        Task<PagedResult<VehicleDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);
        Task UpdateAsync(int id, VehicleModel vehicle);
    }
}