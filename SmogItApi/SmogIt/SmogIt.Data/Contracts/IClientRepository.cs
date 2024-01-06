using SmogIt.Models.Core;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IClientRepository
    {
        Task<int> AddAsync(Client client);

        // Similar CRUD operations for Client entity
        Task<PagedResult<Client>> GetclientsAsync(int pageSize, int page, string sortBy, string direction, string q);
    }
}
