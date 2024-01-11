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
                query = query.Where(c =>
                    c.VehicleModel.VehicleMake.Make.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.VehicleModel.Model.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.LicensePlate.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.Year.ToString().Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.VIN.Contains(q, StringComparison.CurrentCultureIgnoreCase));
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
    }
}
