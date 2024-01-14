using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class VehicleMakeRepository(SmogItContext context) : IVehicleMakeRepository
    {
        public async Task<List<VehicleMake>> GetAllAsync()
        {
            return await context.VehicleMakes.ToListAsync();
        }
        public async Task<List<VehicleMake>> GetByNameAsync(string name)
        {
            return await context.VehicleMakes.Where(m => m.Make.Contains(name.ToLower())).ToListAsync();
        }
    }
}
