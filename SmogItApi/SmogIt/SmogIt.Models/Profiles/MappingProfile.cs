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

            CreateMap<Entities.Vehicle, VehicleModel>()
                .ReverseMap();

            CreateMap<Entities.Vehicle, VehicleDetailsModel>()
                .ForMember(m => m.Make, m => m.MapFrom(s => s.VehicleModel.VehicleMake.Make))
                .ForMember(m => m.Model, m => m.MapFrom(s => s.VehicleModel.Model));



        }
    }
}
