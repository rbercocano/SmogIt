using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Services.Contracts
{
    public interface IStatusService
    {
        Task<List<StatusModel>> GetAllAsync();
    }
}