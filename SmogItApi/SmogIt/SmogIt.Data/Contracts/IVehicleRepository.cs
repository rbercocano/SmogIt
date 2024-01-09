using SmogIt.Core.Domains;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IVehicleRepository
    {
        Task<int> AddAsync(Vehicle vehicle);
        Task<PagedResult<Vehicle>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "VehicleMake", string direction = "asc", string q = "");
    }
}
