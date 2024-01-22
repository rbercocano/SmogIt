using SmogIt.Core.Domains;
using SmogIt.Models.DTO;

namespace SmogIt.Services.Contracts
{
    public interface IAppointmentService
    {
        Task UpdateAppointmentAsync(int appointmentId,AppointmentModel model);
        Task<int> AddAsync(AddAppointmentModel appointment); 
        Task<PagedResult<AppointmentDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q);
        Task<PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q);
        Task<List<AppointmentDetailsModel>> GetNotCompleted();
    }
}