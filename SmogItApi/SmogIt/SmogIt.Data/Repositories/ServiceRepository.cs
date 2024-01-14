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
    }
}
