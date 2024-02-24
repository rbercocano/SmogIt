using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class UserCoordinator(IUserService userService) : IUserCoordinator
    {
        public async Task<PagedResult<UserDetailsModel>> SearchAsync(int pageSize, int page, string? sortBy, string? direction, string? q) => await userService.GetUsersAsync(pageSize, page, sortBy, direction, q);
        public async Task<int> AddAsync(UserModel client) => await userService.AddAsync(client);
        public async Task UpdateAsync(int id, UpdateUserModel user) => await userService.UpdateAsync(id, user);
        public async Task<UserDetailsModel?> FindAsync(int id) => await userService.FindAsync(id);
        public async Task<UserDetailsModel?> FindAsync(string login, string password) => await userService.FindAsync(login, password);

    }
}
