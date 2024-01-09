using AutoMapper;
using SmogIt.Models.DTO;
using SmogIt.Models.Entities;

namespace SmogIt.Models.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ClientModel, Client>().ReverseMap();
            CreateMap<ClientDetailsModel, Client>().ReverseMap();

            CreateMap<Vehicle, VehicleModel>()
                .ForMember(v => v.Make, x => x.MapFrom(y => y.VehicleMake))
                .ForMember(v => v.Model, x => x.MapFrom(y => y.VehicleModel))
                .ReverseMap();

            CreateMap<Vehicle, VehicleDetailsModel>()
                .ForMember(v => v.Make, x => x.MapFrom(y => y.VehicleMake))
                .ForMember(v => v.Model, x => x.MapFrom(y => y.VehicleModel))
                .ReverseMap();

        }
    }
}
