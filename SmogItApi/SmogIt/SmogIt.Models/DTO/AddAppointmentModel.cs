namespace SmogIt.Models.DTO
{
    public class AddAppointmentModel: AppointmentModel
    {
        public List<AppointmentServiceModel> Services { get; set; }
    }
}
