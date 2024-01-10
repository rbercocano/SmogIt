using SmogIt.Data.Contracts;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class StatusService(IStatusRepository statusRepository): IStatusService
    {
    }
}
