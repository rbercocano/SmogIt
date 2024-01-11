

namespace SmogIt.Models.Entities
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int VehicleId { get; set; }
        public short StatusId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Notes { get; set; }
        public Vehicle Vehicle { get; set; }
        public Status Status { get; set; }
        public List<AppointmentService> AppointmentServices { get; set; }
    }
}
