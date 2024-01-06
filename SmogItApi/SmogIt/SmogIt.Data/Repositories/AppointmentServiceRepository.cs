using SmogIt.Data.Context;
using SmogIt.Data.Contracts;

namespace SmogIt.Data.Repositories
{
    public class AppointmentServiceRepository : IAppointmentServiceRepository
    {
        private readonly SmogItContext _context;

        public AppointmentServiceRepository(SmogItContext context)
        {
            _context = context;
        }

        // Similar CRUD operations for AppointmentService entity (asynchronous)
    }
}
