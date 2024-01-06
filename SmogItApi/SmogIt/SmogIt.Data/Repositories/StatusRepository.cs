using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Data.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly SmogItContext _context;

        public StatusRepository(SmogItContext context)
        {
            _context = context;
        }

        // Similar CRUD operations for Status entity (asynchronous)
    }
}
