using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Coordinator.Contracts
{
    public interface IUserCoordinator
    {
        Task<int> AddAsync(UserModel client);
        Task<UserDetailsModel?> FindAsync(int id);
        Task<PagedResult<UserDetailsModel>> SearchAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, UpdateUserModel user);
    }
}