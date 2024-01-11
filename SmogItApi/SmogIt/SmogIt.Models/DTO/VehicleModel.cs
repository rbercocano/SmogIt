namespace SmogIt.Models.DTO
{
    public class VehicleModel
    {
        public int ClientId { get; set; }
        public short ModelId { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public short Year { get; set; }
    }
}
