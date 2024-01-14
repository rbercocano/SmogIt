using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Data.Repositories;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class VehicleMakeService(IVehicleMakeRepository vehicleMakeRepository, IMapper mapper) : IVehicleMakeService
    {
        public async Task<List<VehicleMakeModel>> GetAllAsync()
        {
            var entities = await vehicleMakeRepository.GetAllAsync();
            var data = mapper.Map<List<VehicleMakeModel>>(entities);
            return data;
        }
        public async Task<List<VehicleMakeModel>> GetByNameAsync(string name)
        {
            var entities = await vehicleMakeRepository.GetByNameAsync(name);
            var data = mapper.Map<List<VehicleMakeModel>>(entities);
            return data;
        }
    }
}
