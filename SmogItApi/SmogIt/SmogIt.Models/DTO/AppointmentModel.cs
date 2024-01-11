namespace SmogIt.Models.DTO
{
    public class AppointmentModel
    {
        public int VehicleId { get; set; }
        public short StatusId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Notes { get; set; }
    }
}
