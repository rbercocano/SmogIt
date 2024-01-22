using SmogIt.Core.Domains;
using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IAppointmentRepository
    {
        Task UpdateAsync(Appointment appointment);
        Task<int> AddAsync(Appointment appointment);
        Task<PagedResult<Appointment>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy = "AppointmentDateTime", string direction = "desc", string q = "");
        Task<PagedResult<Appointment>> SearchAsync(int pageSize, int page, string sortBy = "AppointmentDateTime", string direction = "desc", string q = "");
        Task<List<Appointment>> GetNotCompleted();

    }
}
