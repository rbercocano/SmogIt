using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class VehicleRepository(SmogItContext context) : IVehicleRepository
    {

        public async Task<Core.Domains.PagedResult<Vehicle>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "make", string direction = "asc", string q = "")
        {
            var query = context.Vehicles
                .Include(v => v.VehicleModel)
                .ThenInclude(v => v.VehicleMake)
                .Where(v => v.ClientId == clientId);
            if (!string.IsNullOrEmpty(q))
            {
                q = q.ToLower();
                query = query.Where(c =>
                    c.VehicleModel.VehicleMake.Make.ToLower().Contains(q) ||
                    c.VehicleModel.Model.ToLower().Contains(q) ||
                    c.LicensePlate.ToLower().Contains(q) ||
                    c.Year.ToString().ToLower().Contains(q) ||
                    c.VIN.ToLower().Contains(q));
            }
            switch (sortBy.Trim())
            {
                case "": sortBy = "VehicleModel.VehicleMake.Make"; break;
                case "make": sortBy = "VehicleModel.VehicleMake.Make"; break;
                case "model": sortBy = "VehicleModel.Model"; break;
                default: break;
            }

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
        public async Task UpdateAsync(Vehicle vehicle)
        {
            context.Vehicles.Update(vehicle);
            await context.SaveChangesAsync();
        }
    }
}
