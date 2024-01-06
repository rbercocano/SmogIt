using FluentValidation;
using SmogIt.Models.DTO;

namespace SmogIt.API.Validators
{
    public class ClientModelValidator : AbstractValidator<ClientModel>
    {
        public ClientModelValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Email).EmailAddress().MaximumLength(200);
            RuleFor(x => x.Phone).NotEmpty().Matches("^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$").MaximumLength(20);
        }
    }
}
