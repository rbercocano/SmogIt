using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IServiceRepository
    {
        Task<List<Service>> GetAllAsync();
    }
}
