using AutoMapper;
using SmogIt.Data.Contracts;
using SmogIt.Models.Core;
using SmogIt.Models.DTO;
using SmogIt.Services.Contracts;

namespace SmogIt.Services
{
    public class ClientService(IClientRepository clientRepository, IMapper mapper) : IClientService
    {
        public async Task<PagedResult<ClientModel>> GetclientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q)
        {
            var entities = await clientRepository.GetclientsAsync(pageSize, page, sortBy, direction, q);
            var models = mapper.Map<List<ClientModel>>(entities.Items);
            return entities.As(models);
        }
    }
}
