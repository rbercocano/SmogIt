﻿using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Services.Contracts
{
    public interface IClientService
    {
        Task<int> AddAsync(ClientModel client);
        Task<ClientDetailsModel?> FindAsync(int id);
        Task<PagedResult<ClientDetailsModel>> GetClientsAsync(int pageSize, int page, string? sortBy, string? direction, string? q);
        Task UpdateAsync(int id, ClientModel client);
    }
}