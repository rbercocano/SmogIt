using FluentValidation;
using SmogIt.Models.DTO;

namespace SmogIt.API.Validators
{
    public class AppointmentModelValidator : AbstractValidator<AddAppointmentModel>
    {
        public AppointmentModelValidator()
        {
            RuleFor(x => x.Notes).MaximumLength(200);
        }
    }
}
