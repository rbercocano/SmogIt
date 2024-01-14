using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class StatusService(IStatusRepository statusRepository, IMapper mapper) : IStatusService
    {
        public async Task<List<StatusModel>> GetAllAsync()
        {
            var entities = await statusRepository.GetAllAsync();
            var data = mapper.Map<List<StatusModel>>(entities);
            return data;
        }
    }
}
