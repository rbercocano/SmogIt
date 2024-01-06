namespace SmogIt.Models.DTO
{
    public class ClientDetailsModel : ClientModel
    {
        public int ClientId { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
