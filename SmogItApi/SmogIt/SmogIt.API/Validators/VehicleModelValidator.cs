using FluentValidation;
using SmogIt.Models.DTO;

namespace SmogIt.API.Validators
{
    public class VehicleModelValidator : AbstractValidator<VehicleModel>
    {
        public VehicleModelValidator()
        {
            RuleFor(x => x.Make).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Model).NotEmpty().MaximumLength(50);
            RuleFor(x => x.LicensePlate).NotEmpty().MaximumLength(20); 
        }
    }
}
