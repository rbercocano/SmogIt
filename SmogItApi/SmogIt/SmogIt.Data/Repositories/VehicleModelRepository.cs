using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Repositories
{
    public class VehicleModelRepository(SmogItContext context) : IVehicleModelRepository
    {
        public async Task<List<VehicleModel>> GetByMakeAsync(short makeId)
        {
            return await context.VehicleModels.Where(m => m.MakeId == makeId).ToListAsync();
        }
        public async Task<List<VehicleModel>> GetByNameAsync(short makeId, string name)
        {
            return await context.VehicleModels.Where(m => m.Model.ToLower().Contains(name.ToLower()) && m.MakeId == makeId).ToListAsync();
        }
    }
}
