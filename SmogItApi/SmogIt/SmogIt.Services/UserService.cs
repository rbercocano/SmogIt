using SmogIt.Data.Contracts;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class UserService(IUserRepository userRepository): IUserService
    {
    }
}
