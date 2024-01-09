using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Models.Entities
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int VehicleId { get; set; }
        public int StatusId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Notes { get; set; }
        public Vehicle Vehicle { get; set; }
        public Status Status { get; set; }
        public List<AppointmentService> AppointmentServices { get; set; }
    }
}
