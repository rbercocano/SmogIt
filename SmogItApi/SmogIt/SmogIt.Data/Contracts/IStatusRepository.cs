using SmogIt.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Data.Contracts
{
    public interface IStatusRepository
    {
        // Similar CRUD operations for Status entity
        Task<List<Status>> GetAllAsync();
    }
}
