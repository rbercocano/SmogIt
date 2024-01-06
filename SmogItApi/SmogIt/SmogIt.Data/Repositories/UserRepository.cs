using SmogIt.Data.Context;
using SmogIt.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SmogItContext _context;

        public UserRepository(SmogItContext context)
        {
            _context = context;
        }

        // Similar CRUD operations for User entity (asynchronous)
    }
}
