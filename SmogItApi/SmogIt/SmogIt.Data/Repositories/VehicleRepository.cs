using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class VehicleRepository(SmogItContext context) : IVehicleRepository
    {

        public async Task<Core.Domains.PagedResult<Vehicle>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "VehicleMake", string direction = "asc", string q = "")
        {
            var query = context.Vehicles.Where(v => v.ClientId == clientId);
            if (!string.IsNullOrEmpty(q))
                query = query.Where(c =>
                    c.VehicleMake.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.VehicleModel.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.LicensePlate.Contains(q, StringComparison.CurrentCultureIgnoreCase));

            sortBy = string.IsNullOrEmpty(sortBy) ? "VehicleMake" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<Vehicle>(page, pageSize, count, data);
        }
        public async Task<int> AddAsync(Vehicle vehicle)
        {
            var c = await context.Vehicles.AddAsync(vehicle);
            await context.SaveChangesAsync();
            return c.Entity.VehicleId;
        }
    }
}
