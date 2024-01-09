using SmogIt.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Data.Contracts
{
    public interface IVehicleRepository
    {
        // Similar CRUD operations for Vehicle entity
        Task<List<Vehicle>> GetByClient(int clientId);
    }
}
