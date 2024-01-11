using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class AppointmentRepository(SmogItContext context) : IAppointmentRepository
    {
        public async Task<Core.Domains.PagedResult<Appointment>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "AppointmentDateTime", string direction = "desc", string q = "")
        {
            var query = context.Appointments
                .Include(c => c.Status)
                .Include(c => c.AppointmentServices)
                .ThenInclude(c => c.Service)
                .Include(c => c.Vehicle)
                .ThenInclude(v => v.VehicleModel)
                .ThenInclude(v => v.VehicleMake)
                .Where(v => v.Vehicle.ClientId == clientId);
            if (!string.IsNullOrEmpty(q))
                query = query.Where(c =>
                    c.Status.StatusName.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.Vehicle.VehicleModel.VehicleMake.Make.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.Vehicle.VehicleModel.Model.Contains(q, StringComparison.CurrentCultureIgnoreCase) ||
                    c.Vehicle.LicensePlate.Contains(q, StringComparison.CurrentCultureIgnoreCase));
            sortBy = string.IsNullOrEmpty(sortBy) ? "AppointmentDateTime" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<Appointment>(page, pageSize, count, data);
        }
        public async Task<int> AddAsync(Appointment appointment)
        {
            var c = await context.Appointments.AddAsync(appointment);
            await context.SaveChangesAsync();
            return c.Entity.AppointmentId;
        }
    }
}
