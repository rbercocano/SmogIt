using SmogIt.Coordinator.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class StatusCoordinator(IStatusService statusService) : IStatusCoordinator
    {
        public async Task<List<StatusModel>> GetAllAsync() => await statusService.GetAllAsync();
    }
}
