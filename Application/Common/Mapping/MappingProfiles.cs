using Application.Dtos;
using AutoMapper;
using Domain;

namespace Application.Common.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<RegisterUserDto, User>();
            CreateMap<CompanyDto, Company>().ReverseMap();
            CreateMap<SubdivisionDto, Subdivision>().ReverseMap();
            CreateMap<Role, RoleDto>();
        }
    }
}
