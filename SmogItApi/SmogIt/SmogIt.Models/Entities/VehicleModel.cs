namespace SmogIt.Models.Entities
{
    public class VehicleModel
    {
        public short ModelId { get; set; }
        public short MakeId { get; set; }
        public string Model { get; set; }

        public VehicleMake VehicleMake { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }
}
