namespace SmogIt.Models.Entities
{
    public class Service
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }

        // Navigation properties
        public List<AppointmentService> AppointmentServices { get; set; }
    }
}
