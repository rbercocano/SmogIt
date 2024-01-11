using FluentValidation;
using SmogIt.Models.DTO;

namespace SmogIt.API.Validators
{
    public class VehicleModelValidator : AbstractValidator<VehicleModel>
    {
        public VehicleModelValidator()
        {
            RuleFor(x => x.LicensePlate).MaximumLength(20);
            RuleFor(x => x.LicensePlate).MaximumLength(17);

        }
    }
}
