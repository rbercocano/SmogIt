using SmogIt.Coordinator.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Coordinator
{
    public class ClientCoordinator(IServiceService serviceService, IClientService clientService, IVehicleService vehicleService, IAppointmentService appointmentService, IAppointmentServiceService appointmentServiceService) : IClientCoordinator
    {

        public async Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            return await clientService.GetClientsAsync(pageSize, page, sortBy, direction, q);
        }
        public async Task<int> AddAsync(ClientModel client)
        {
            return await clientService.AddAsync(client);
        }
        public async Task UpdateAsync(int id, ClientModel client) => await clientService.UpdateAsync(id, client);
        public async Task<ClientDetailsModel?> FindAsync(int id) => await clientService.FindAsync(id);

        public async Task<int> AddVehicleAsync(VehicleModel model)
        {
            return await vehicleService.AddAsync(model);
        }
        public async Task UpdateVehicleAsync(int id, VehicleModel model)
        {
            await vehicleService.UpdateAsync(id, model);
        }
        public async Task<PagedResult<VehicleDetailsModel>> GeVehiclesByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q)
        {
            return await vehicleService.GetByClientAsync(clientId, pageSize, page, sortBy, direction, q);
        }

        public async Task<int> AddAppointmentAsync(AddAppointmentModel appointment)
        {
            var id = await appointmentService.AddAsync(appointment);
            foreach (var service in appointment.Services)
            {
                var s = await serviceService.FindAsync(service.ServiceId);
                service.OriginalPrice = s.Price;
                await appointmentServiceService.AddAync(id, service);
            }
            return id;
        }
        public async Task<PagedResult<AppointmentDetailsModel>> GeAppointmentsByClientAsync(int clientId, int pageSize, int page, string sortBy, string direction, string q)
        {
            return await appointmentService.GetByClientAsync(clientId, pageSize, page, sortBy, direction, q);
        }

        public async Task UpdateAppointmentAsync(int appointmentId, UpdateAppointmentModel model)
        {
            await appointmentService.UpdateAppointmentAsync(appointmentId, model);
            foreach (var id in model.ServicesToRemove.Distinct())
                await appointmentServiceService.RemoveAync(id);

            foreach (var service in model.ServicesToAdd)
            {
                var s = await serviceService.FindAsync(service.ServiceId);
                service.OriginalPrice = s.Price;
                await appointmentServiceService.AddAync(appointmentId, service);
            }
        }
    }
}
