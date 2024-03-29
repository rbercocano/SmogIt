﻿namespace SmogIt.Models.DTO
{
    public class AppointmentServiceDetailsModel
    {
        public int AppointmentServiceId { get; set; }
        public int AppointmentId { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal OriginalPrice { get; set; }
    }
}
