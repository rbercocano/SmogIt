using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IServiceService
    {
        Task<ServiceDetailsModel?> FindAsync(int id);
        Task<List<ServiceDetailsModel>> GetAllAsync();
        Task<int> AddAsync(ServiceModel service);
        Task UpdateAsync(int id, ServiceModel service);
    }
}