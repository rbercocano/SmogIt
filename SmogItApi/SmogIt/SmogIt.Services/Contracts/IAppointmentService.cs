using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IAppointmentService
    {
        Task<int> AddAsync(AppointmentModel appointment);
        Task<PagedResult<AppointmentDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);
    }
}