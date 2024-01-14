using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class ServiceService(IServiceRepository serviceRepository, IMapper mapper) : IServiceService
    {
        public async Task<List<ServiceModel>> GetAllAsync()
        {
            var entities = await serviceRepository.GetAllAsync();
            return mapper.Map<List<ServiceModel>>(entities);
        }
    }
}
