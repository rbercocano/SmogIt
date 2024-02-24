using Microsoft.EntityFrameworkCore;
using SmogIt.Core.Extenstions;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class UserRepository(SmogItContext context) : IUserRepository
    {

        public async Task<Core.Domains.PagedResult<User>> GetUsersAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "")
        {
            var query = context.Users.AsQueryable();
            if (!string.IsNullOrEmpty(q))
            {
                q = q.ToLower();
                query = query.Where(c =>
                    c.FirstName.ToLower().Contains(q) ||
                    c.LastName.ToLower().Contains(q) ||
                    c.Email.ToLower().Contains(q));
            }
            sortBy = string.IsNullOrEmpty(sortBy) ? "FirstName" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<User>(page, pageSize, count, data);
        }
        public async Task<int> AddAsync(User user)
        {
            try
            {
                var c = await context.Users.AddAsync(user);
                context.SaveChanges();
                return c.Entity.UserId;

            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<bool> UpdateAsync(User user)
        {
            var rows = await context.Users.Where(c => c.UserId == user.UserId)
                             .ExecuteUpdateAsync(setters =>
                                setters.SetProperty(b => b.LastName, user.LastName)
                               .SetProperty(b => b.FirstName, user.FirstName)
                               .SetProperty(b => b.Email, user.Email)
                               .SetProperty(b => b.Active, user.Active));
            await context.SaveChangesAsync();
            return rows > 0;
        }
        public async Task<User?> FindAsync(int id)
        {
            var c = await context.Users.FindAsync(id);
            return c;
        }
        public async Task<User?> FindAsync(string login, string password)
        {
            var c = await context.Users.FirstOrDefaultAsync(u => u.Login.ToLower() == login.ToLower() && password == u.Password);
            return c;
        }
    }
}
