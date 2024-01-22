using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class ServiceService(IServiceRepository serviceRepository, IMapper mapper) : IServiceService
    {
        public async Task<List<ServiceDetailsModel>> GetAllAsync()
        {
            var entities = await serviceRepository.GetAllAsync();
            return mapper.Map<List<ServiceDetailsModel>>(entities);
        }
        public async Task<ServiceDetailsModel?> FindAsync(int id)
        {
            var entities = await serviceRepository.FindAsync(id);
            return mapper.Map<ServiceDetailsModel>(entities);
        }

        public async Task<int> AddAsync(ServiceModel service)
        {
            var entity = mapper.Map<Service>(service);
            return await serviceRepository.AddAsync(entity);
        }

        public async Task UpdateAsync(int id, ServiceModel service)
        {
            var entity = mapper.Map<Service>(service);
            entity.ServiceId = id;
            await serviceRepository.UpdateAsync(entity);
        }
    }
}
