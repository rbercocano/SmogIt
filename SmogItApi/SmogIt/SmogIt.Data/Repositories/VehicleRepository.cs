using Microsoft.EntityFrameworkCore;
using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using SmogIt.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Data.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly SmogItContext _context;

        public VehicleRepository(SmogItContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetByClient(int clientId) {
            var data = await _context.Vehicles.Where(v => v.ClientId == clientId).ToListAsync();
            return data; 
        }
    }
}
