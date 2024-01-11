using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using Entities = SmogIt.Models.Entities;
using SmogIt.Services.Contracts;
using SmogIt.Core.Services;

namespace SmogIt.Services
{
    public class VehicleService(IVehicleRepository vehicleRepository, IMapper mapper, NotificationService notificationService) : IVehicleService
    {
        public async Task<int> AddAsync(VehicleModel vehicle)
        {
            var entity = mapper.Map<Entities.Vehicle>(vehicle);
            var id = await vehicleRepository.AddAsync(entity);
            return id;
        }

        public async Task<PagedResult<VehicleDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q)
        {
            var entities = await vehicleRepository.GetByClientAsync(clientId, pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<VehicleDetailsModel>>(entities.Items);
            return entities.As(models);
        }
    }
}
