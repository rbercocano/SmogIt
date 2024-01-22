using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IUserService
    {
        Task<int> AddAsync(UserModel user);
        Task<PagedResult<UserDetailsModel>> GetUsersAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "");
        Task<bool> UpdateAsync(int userId, UpdateUserModel user);
        Task<UserDetailsModel> FindAsync(int userId);
    }
}