using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IStatusRepository
    {
        Task<List<Status>> GetAllAsync();
    }
}
