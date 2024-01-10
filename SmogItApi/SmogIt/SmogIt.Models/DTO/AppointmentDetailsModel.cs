namespace SmogIt.Models.DTO
{
    public class AppointmentDetailsModel
    {
        public int AppointmentId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Notes { get; set; }

        public int StatusId { get; set; }
        public string Status { get; set; }

        public int VehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string LicensePlate { get; set; }

        public List<AppointmentServiceDetailsModel> Services { get; set; }
    }
}
