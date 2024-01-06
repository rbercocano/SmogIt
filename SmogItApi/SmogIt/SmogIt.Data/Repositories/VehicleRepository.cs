using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
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

        // Similar CRUD operations for Vehicle entity (asynchronous)
    }
}
