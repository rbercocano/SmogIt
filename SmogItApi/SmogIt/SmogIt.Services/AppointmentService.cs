using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper) : IAppointmentService
    {
        public async Task<Core.Domains.PagedResult<AppointmentDetailsModel>> GetByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q)
        {
           var entities = await appointmentRepository.GetByClientAsync(clientId, pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<AppointmentDetailsModel>>(entities.Items);
            return entities.As(models);
        }
        public async Task<Core.Domains.PagedResult<AppointmentDetailsModel>> SearchAsync(int pageSize, int page, string sortBy, string direction, string q)
        {
            var entities = await appointmentRepository.SearchAsync(pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<AppointmentDetailsModel>>(entities.Items);
            return entities.As(models);
        }
        public async Task<int> AddAsync(AppointmentModel appointment)
        {
            var entity = mapper.Map<Appointment>(appointment);
            var id = await appointmentRepository.AddAsync(entity);
            return id;
        }
    }
}

