using SmogIt.Core.Domains;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IUserRepository
    {
        Task<int> AddAsync(User user);
        Task<PagedResult<User>> GetUsersAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "");
        Task<bool> UpdateAsync(User user);
        Task<User?> FindAsync(int userId);
        Task<User?> FindAsync(string login, string password);
    }
}
