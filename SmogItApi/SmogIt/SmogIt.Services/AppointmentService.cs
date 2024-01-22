using AutoMapper;
using Azure;
using SmogIt.Data.Contracts;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;
using System.Globalization;

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
        public async Task<int> AddAsync(AddAppointmentModel appointment)
        {
            var entity = mapper.Map<Appointment>(appointment);
            var id = await appointmentRepository.AddAsync(entity);
            return id;
        }

        public async Task UpdateAppointmentAsync(int appointmentId, AppointmentModel model)
        {
            var entity = mapper.Map<Appointment>(model);
            entity.AppointmentId = appointmentId;
            await appointmentRepository.UpdateAsync(entity);
        }
        public async Task<List<AppointmentDetailsModel>> GetNotCompleted()
        {
            var entities = await appointmentRepository.GetNotCompleted();
            return mapper.Map<List<AppointmentDetailsModel>>(entities);
        }
    }
}

