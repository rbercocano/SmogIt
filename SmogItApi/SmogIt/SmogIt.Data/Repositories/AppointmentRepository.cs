using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System.Linq.Dynamic.Core;

namespace SmogIt.Data.Repositories
{
    public class AppointmentRepository(SmogItContext context) : IAppointmentRepository
    {
        public async Task<Core.Domains.PagedResult<Appointment>> SearchAsync(int pageSize, int page, string sortBy = "AppointmentDateTime", string direction = "desc", string q = "")
        {
            var query = context.Appointments
            .Include(c => c.Status)
            .Include(c => c.AppointmentServices)
            .ThenInclude(c => c.Service)
            .Include(c => c.Vehicle)
            .ThenInclude(v => v.VehicleModel)
            .ThenInclude(v => v.VehicleMake)
            .Include(c => c.Vehicle)
            .ThenInclude(c => c.Client).AsQueryable();
            if (!string.IsNullOrEmpty(q))
            {
                q = q.ToLower();
                query = query.Where(c =>
                    c.Status.StatusName.ToLower().Contains(q) ||
                    c.Vehicle.VehicleModel.VehicleMake.Make.ToLower().Contains(q) ||
                    c.Vehicle.VehicleModel.Model.ToLower().Contains(q) ||
                    c.Vehicle.LicensePlate.ToLower().Contains(q) ||
                    c.Vehicle.Client.FirstName.ToLower().Contains(q) ||
                    c.Vehicle.Client.LastName.ToLower().Contains(q));
            }
            switch (sortBy.Trim())
            {
                case "": sortBy = "Vehicle.VehicleModel.VehicleMake.Make"; break;
                case "make": sortBy = "Vehicle.VehicleModel.VehicleMake.Make"; break;
                case "model": sortBy = "Vehicle.VehicleModel.Model"; break;
                case "year": sortBy = "Vehicle.Year"; break;
                case "firstName": sortBy = "Vehicle.Client.FirstName"; break;
                default: break;
            }
            sortBy = string.IsNullOrEmpty(sortBy) ? "AppointmentDateTime" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<Appointment>(page, pageSize, count, data);

        }

        public async Task<Core.Domains.PagedResult<Appointment>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "AppointmentDateTime", string direction = "desc", string q = "")
        {
            var query = context.Appointments
            .Include(c => c.Status)
            .Include(c => c.AppointmentServices)
            .ThenInclude(c => c.Service)
            .Include(c => c.Vehicle)
            .ThenInclude(v => v.VehicleModel)
            .ThenInclude(v => v.VehicleMake)
            .Include(c => c.Vehicle)
            .ThenInclude(c => c.Client)
            .Where(v => v.Vehicle.ClientId == clientId);
            if (!string.IsNullOrEmpty(q))
            {
                q = q.ToLower();
                query = query.Where(c =>
                    c.Status.StatusName.ToLower().Contains(q) ||
                    c.Vehicle.VehicleModel.VehicleMake.Make.ToLower().Contains(q) ||
                    c.Vehicle.VehicleModel.Model.ToLower().Contains(q) ||
                    c.Vehicle.LicensePlate.ToLower().Contains(q));
            }
            switch (sortBy.Trim())
            {
                case "": sortBy = "Vehicle.VehicleModel.VehicleMake.Make"; break;
                case "make": sortBy = "Vehicle.VehicleModel.VehicleMake.Make"; break;
                case "model": sortBy = "Vehicle.VehicleModel.Model"; break;
                case "year": sortBy = "Vehicle.Year"; break;
                default: break;
            }
            sortBy = string.IsNullOrEmpty(sortBy) ? "AppointmentDateTime" : sortBy;
            direction = direction?.ToLower() == "desc" ? "desc" : "asc";
            query = query.OrderBy($"{sortBy} {direction}");
            var count = await query.CountAsync();
            var data = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Core.Domains.PagedResult<Appointment>(page, pageSize, count, data);

        }
        public async Task<int> AddAsync(Appointment appointment)
        {
            try
            {
                var c = await context.Appointments.AddAsync(appointment);
                await context.SaveChangesAsync();
                return c.Entity.AppointmentId;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
