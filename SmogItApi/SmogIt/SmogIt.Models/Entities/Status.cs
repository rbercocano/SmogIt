namespace SmogIt.Models.Entities
{
    public class Status
    {
        public short StatusId { get; set; }
        public string StatusName { get; set; }

        // Navigation properties
        public List<Appointment> Appointments { get; set; }
    }
}
