using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class ClientRepository(SmogItContext context) : IClientRepository
    {
        public async Task<Models.Core.PagedResult<Client>> GetclientsAsync(int pageSize, int page, string sortBy = "FirstName", string direction = "asc", string q = "")
        {
            var query = context.Clients.AsQueryable();
            if (!string.IsNullOrEmpty(q))
                query = query.Where(c =>
                    c.FirstName.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.LastName.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.Email.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.RegistrationDate.ToString("G").Contains(q, StringComparison.CurrentCultureIgnoreCase));

            sortBy = string.IsNullOrEmpty(sortBy) ? "FirstName" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Models.Core.PagedResult<Client>(page, pageSize, count, data);
        }
        public async Task<int> AddAsync(Client client)
        {
            var c = await context.Clients.AddAsync(client);
            return c.Entity.ClientId;
        }
    }
}
