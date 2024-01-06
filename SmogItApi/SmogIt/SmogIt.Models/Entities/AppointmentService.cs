using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Models.Entities
{
    public class AppointmentService
    {
        public int AppointmentID { get; set; }
        public int ServiceID { get; set; }

        // Navigation properties
        public Appointment Appointment { get; set; }
        public Service Service { get; set; }
    }
}
