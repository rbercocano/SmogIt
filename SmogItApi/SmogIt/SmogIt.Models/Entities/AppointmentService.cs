namespace SmogIt.Models.Entities
{
    public class AppointmentService
    {
        public int AppointmentServiceId { get; set; }
        public int AppointmentId { get; set; }
        public int ServiceId { get; set; }
        public decimal Price { get; set; }
        public Appointment Appointment { get; set; }
        public Service Service { get; set; }
    }
}
