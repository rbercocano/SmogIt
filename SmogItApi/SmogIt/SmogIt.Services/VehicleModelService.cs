using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class VehicleModelService(IVehicleModelRepository vehicleModelRepository, IMapper mapper) : IVehicleModelService
    {
        public async Task<List<VehicleModelModel>> GetByMakeAsync(short makeId)
        {
            var entities = await vehicleModelRepository.GetByMakeAsync(makeId);
            var data = mapper.Map<List<VehicleModelModel>>(entities);
            return data;

        }
        public async Task<List<VehicleModelModel>> GetByNameAsync(short makeId, string name)
        {
            var entities = await vehicleModelRepository.GetByNameAsync(makeId, name);
            var data = mapper.Map<List<VehicleModelModel>>(entities);
            return data;
        }
    }
}
