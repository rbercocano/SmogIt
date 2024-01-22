using SmogIt.Models.Entities;

namespace SmogIt.Models.DTO
{
    public class VehicleDetailsModel : VehicleModel
    {
        public int VehicleId { get; set; }
        public int MakeId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
    }
}
