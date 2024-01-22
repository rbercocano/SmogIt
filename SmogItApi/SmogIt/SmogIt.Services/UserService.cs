using AutoMapper;
using SmogIt.Core.Domains;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
    {
        public async Task<int> AddAsync(UserModel user)
        {
            var entity = mapper.Map<User>(user);
            return await userRepository.AddAsync(entity);
        }

        public async Task<UserDetailsModel> FindAsync(int userId)
        {
            var entity = await userRepository.FindAsync(userId);
            return mapper.Map<UserDetailsModel>(entity);
        }

        public async Task<PagedResult<UserDetailsModel>> GetUsersAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "")
        {
            var entities = await userRepository.GetUsersAsync(pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<UserDetailsModel>>(entities.Items);
            return entities.As(models);
        }

        public async Task<bool> UpdateAsync(int userId, UpdateUserModel user)
        {
            var entity = mapper.Map<User>(user);
            entity.UserId = userId;
            return await userRepository.UpdateAsync(entity);
        }
    }
}
