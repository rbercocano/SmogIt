using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class ClientRepository(SmogItContext context) : IClientRepository
    {
        public async Task<Core.Domains.PagedResult<Client>> GetClientsAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "")
        {
            var query = context.Clients.AsQueryable();
            if (!string.IsNullOrEmpty(q))
                query = query.Where(c =>
                    c.FirstName.ToLower().Contains(q.ToLower()) ||
                    c.LastName.ToLower().Contains(q.ToLower()) ||
                    c.Email.ToLower().Contains(q.ToLower()));

            sortBy = string.IsNullOrEmpty(sortBy) ? "FirstName" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<Client>(page, pageSize, count, data);
        }
        public async Task<int> AddAsync(Client client)
        {
            var c = await context.Clients.AddAsync(client);
            context.SaveChanges();
            return c.Entity.ClientId;
        }
        public async Task<bool> UpdateAsync(Client client)
        {
            var rows = await context.Clients.Where(c => c.ClientId == client.ClientId)
                             .ExecuteUpdateAsync(setters =>
                                setters.SetProperty(b => b.LastName, client.LastName)
                               .SetProperty(b => b.FirstName, client.FirstName)
                               .SetProperty(b => b.Email, client.Email)
                               .SetProperty(b => b.Phone, client.Phone));
            await context.SaveChangesAsync();
            return rows > 0;
        }
        public async Task<Client?> FindAsync(int id)
        {
            var c = await context.Clients.FindAsync(id);
            return c;
        }
    }
}
