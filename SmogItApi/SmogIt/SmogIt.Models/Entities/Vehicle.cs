namespace SmogIt.Models.Entities
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public int ClientId { get; set; }
        public short ModelId { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public short Year { get; set; }

        // Navigation properties
        public VehicleModel VehicleModel { get; set; }
        public Client Client { get; set; }
        public List<Appointment> Appointments { get; set; }
    }
}
