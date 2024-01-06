using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmogIt.Models.Entities
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public int ClientId { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleModel { get; set; }
        public string LicensePlate { get; set; }

        // Navigation properties
        public Client Client { get; set; }
        public List<Appointment> Appointments { get; set; }
    }
}
