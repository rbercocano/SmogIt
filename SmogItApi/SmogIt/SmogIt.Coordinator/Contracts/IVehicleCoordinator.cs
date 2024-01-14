using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IVehicleCoordinator
    {
        Task<List<VehicleMakeModel>> GetAllMakesAsync();
        Task<List<VehicleMakeModel>> GetAllMakesByNameAsync(string name);
        Task<List<VehicleModelModel>> GetAllModelsByMakeAsync(short makeId);
        Task<List<VehicleModelModel>> GetAllModelsByMakeAsync(short makeId, string name);
    }
}
