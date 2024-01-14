using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class StatusRepository(SmogItContext context) : IStatusRepository
    {
        public async Task<List<Status>> GetAllAsync()
        {
            return await context.Statuses.ToListAsync();
        }
    }
}
