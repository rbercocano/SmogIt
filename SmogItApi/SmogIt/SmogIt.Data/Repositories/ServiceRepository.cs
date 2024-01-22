using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class ServiceRepository(SmogItContext context) : IServiceRepository
    {
        public async Task<List<Service>> GetAllAsync()
        {
            return await context.Services.ToListAsync();
        }
        public async Task<Service?> FindAsync(int id)
        {
            return await context.Services.FindAsync(id);
        }
        public async Task<int> AddAsync(Service service)
        {
            var c = await context.Services.AddAsync(service);
            context.SaveChanges();
            return c.Entity.ServiceId;
        }
        public async Task UpdateAsync(Service service)
        {
            context.Services.Update(service);
            await context.SaveChangesAsync();
        }
    }
}
