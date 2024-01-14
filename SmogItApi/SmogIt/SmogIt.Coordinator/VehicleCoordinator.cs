using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class VehicleCoordinator(IVehicleMakeService vehicleMakeService, IVehicleModelService vehicleModelService) : IVehicleCoordinator
    {

        public async Task<List<VehicleMakeModel>> GetAllMakesAsync()
        {
            return await vehicleMakeService.GetAllAsync();
        }
        public async Task<List<VehicleModelModel>> GetAllModelsByMakeAsync(short makeId)
        {
            return await vehicleModelService.GetByMakeAsync(makeId);
        }
        public async Task<List<VehicleMakeModel>> GetAllMakesByNameAsync(string name)
        {
            return await vehicleMakeService.GetByNameAsync(name);
        }
        public async Task<List<VehicleModelModel>> GetAllModelsByMakeAsync(short makeId, string name)
        {
            return await vehicleModelService.GetByNameAsync(makeId, name);
        }
    }
}
