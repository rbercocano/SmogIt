using SmogIt.Models.Entities;

namespace SmogIt.Data.Contracts
{
    public interface IVehicleMakeRepository
    {
        Task<List<VehicleMake>> GetAllAsync();
        Task<List<VehicleMake>> GetByNameAsync(string name);
    }
}
