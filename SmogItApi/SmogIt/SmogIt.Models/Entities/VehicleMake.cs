namespace SmogIt.Models.Entities
{
    public class VehicleMake
    {
        public short MakeId { get; set; }
        public string Make { get; set; }
        public List<VehicleModel> VehicleModels { get; set; }
    }
}
