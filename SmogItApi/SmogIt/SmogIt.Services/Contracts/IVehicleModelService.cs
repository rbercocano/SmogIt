using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IVehicleModelService
    {
        Task<List<VehicleModelModel>> GetByMakeAsync(short makeId);
        Task<List<VehicleModelModel>> GetByNameAsync(short makeId, string name);
    }
}