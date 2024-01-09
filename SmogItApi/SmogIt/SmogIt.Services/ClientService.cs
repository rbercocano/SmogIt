using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;
using SmogIt.Core.Services;

namespace SmogIt.Services
{
    public class ClientService(IClientRepository clientRepository, IMapper mapper, NotificationService notificationService) : IClientService
    {
        public async Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            var entities = await clientRepository.GetClientsAsync(pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<ClientDetailsModel>>(entities.Items);
            return entities.As(models);
        }
        public async Task<int> AddAsync(ClientModel client)
        {
            var entity = mapper.Map<Client>(client);
            return await clientRepository.AddAsync(entity);
        }
        public async Task UpdateAsync(int id, ClientModel client)
        {

            var entity = mapper.Map<Client>(client);
            entity.ClientId = id;
            var updated = await clientRepository.UpdateAsync(entity);
            if (!updated)
            {
                notificationService.AddNotification("Client not found");
                return;
            }
            return;
        }
        public async Task<ClientDetailsModel?> FindAsync(int id)
        {
            var entity = await clientRepository.FindAsync(id);
            var client = mapper.Map<ClientDetailsModel>(entity);
            return client;
        }
    }
}
