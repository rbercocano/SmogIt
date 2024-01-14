using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IVehicleModelRepository
    {
        Task<List<VehicleModel>> GetByMakeAsync(short makeId);
        Task<List<VehicleModel>> GetByNameAsync(short makeId, string name);
    }
}
