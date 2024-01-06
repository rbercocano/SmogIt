using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class ClientService(IClientRepository clientRepository, IMapper mapper) : IClientService
    {
        public async Task<PagedResult<ClientDetailsModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            var entities = await clientRepository.GetclientsAsync(pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<ClientDetailsModel>>(entities.Items);
            return entities.As(models);
        }
        public async Task<int> AddAsync(ClientModel client)
        {
            var entity = mapper.Map<Client>(client);
            return await clientRepository.AddAsync(entity);
        }
    }
}
