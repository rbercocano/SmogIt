namespace SmogIt.Models.DTO
{
    public class UpdateAppointmentModel : AppointmentModel
    {
        public List<AppointmentServiceModel> ServicesToAdd { get; set; }
        public List<int> ServicesToRemove { get; set; }
    }
}
