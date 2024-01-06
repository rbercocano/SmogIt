using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Models.Entities
{
    public class Status
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }

        // Navigation properties
        public List<Appointment> Appointments { get; set; }
    }
}
