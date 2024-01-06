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
        }
    }
}
