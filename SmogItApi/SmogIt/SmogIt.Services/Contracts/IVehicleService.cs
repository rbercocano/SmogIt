using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Services.Contracts
{
    public interface IVehicleService
    {
        Task<int> AddAsync(VehicleModel vehicle);
        Task<PagedResult<VehicleDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);

    }
}