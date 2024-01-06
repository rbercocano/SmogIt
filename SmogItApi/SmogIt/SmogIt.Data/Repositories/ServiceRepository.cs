using SmogIt.Data.Context;
using SmogIt.Data.Contracts;

namespace SmogIt.Data.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly SmogItContext _context;

        public ServiceRepository(SmogItContext context)
        {
            _context = context;
        }

        // Similar CRUD operations for Service entity (asynchronous)
    }
}
