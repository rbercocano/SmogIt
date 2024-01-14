using AutoMapper;
using SmogIt.Models.DTO;

namespace SmogIt.Models.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ClientModel, Entities.Client>().ReverseMap();
            CreateMap<ClientDetailsModel, Entities.Client>().ReverseMap();

            CreateMap<Entities.Vehicle, VehicleModel>().ReverseMap();

            CreateMap<Entities.Vehicle, VehicleDetailsModel>()
                .ForMember(m => m.Make, m => m.MapFrom(s => s.VehicleModel.VehicleMake.Make))
                .ForMember(m => m.Model, m => m.MapFrom(s => s.VehicleModel.Model));

            CreateMap<AppointmentModel, Entities.Appointment>()
                .ForMember(m => m.AppointmentDateTime, m => m.MapFrom(s => DateTime.Now));

            CreateMap<Entities.Appointment, AppointmentDetailsModel>()
                .ForMember(m => m.Status, m => m.MapFrom(s => s.Status.StatusName))
                .ForMember(m => m.Make, m => m.MapFrom(s => s.Vehicle.VehicleModel.VehicleMake.Make))
                .ForMember(m => m.Model, m => m.MapFrom(s => s.Vehicle.VehicleModel.Model))
                .ForMember(m => m.LicensePlate, m => m.MapFrom(s => s.Vehicle.LicensePlate))
                .ForMember(m => m.VIN, m => m.MapFrom(s => s.Vehicle.VIN))
                .ForMember(m => m.Year, m => m.MapFrom(s => s.Vehicle.Year))
                .ForMember(m => m.Services, m => m.MapFrom(s => s.AppointmentServices));

            CreateMap<Entities.AppointmentService, AppointmentServiceDetailsModel>()
                .ForMember(m => m.AppointmentId, m => m.MapFrom(s => s.AppointmentId))
                .ForMember(m => m.AppointmentServiceId, m => m.MapFrom(s => s.AppointmentServiceId))
                .ForMember(m => m.ServiceId, m => m.MapFrom(s => s.ServiceId))
                .ForMember(m => m.ServiceName, m => m.MapFrom(s => s.Service.ServiceName))
                .ForMember(m => m.Price, m => m.MapFrom(s => s.Price))
                .ForMember(m => m.Description, m => m.MapFrom(s => s.Service.Description));


            CreateMap<Entities.VehicleMake, VehicleMakeModel>().ReverseMap();
            CreateMap<Entities.VehicleModel, VehicleModelModel>().ReverseMap();
            CreateMap<Entities.Status, StatusModel>().ReverseMap();
            CreateMap<Entities.Service, ServiceModel>().ReverseMap();

        }
    }
}
