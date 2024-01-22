using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IServiceRepository
    {
        Task<int> AddAsync(Service service);
        Task<Service?> FindAsync(int id);
        Task<List<Service>> GetAllAsync();
        Task UpdateAsync(Service service);
    }
}
