namespace SmogIt.Models.DTO
{
    public class AppointmentModel
    {
        public int VehicleId { get; set; }
        public int StatusId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Notes { get; set; }
    }
}
