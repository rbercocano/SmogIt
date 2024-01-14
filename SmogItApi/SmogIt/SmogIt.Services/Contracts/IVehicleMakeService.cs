using SmogIt.Core.Domains;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Services.Contracts
{
    public interface IVehicleMakeService
    {
        Task<List<VehicleMakeModel>> GetAllAsync();
        Task<List<VehicleMakeModel>> GetByNameAsync(string name);
    }
}