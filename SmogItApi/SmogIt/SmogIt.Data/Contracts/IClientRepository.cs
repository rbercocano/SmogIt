using SmogIt.Models.Core;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IClientRepository
    {
        Task<int> AddAsync(Client client);
        Task<Client?> FindAsync(int id);
        Task<PagedResult<Client>> GetClientsAsync(int pageSize, int page, string sortBy, string direction, string q);
        Task<bool> UpdateAsync(Client client);
    }
}
