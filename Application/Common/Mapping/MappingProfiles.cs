using Application.Dtos;
using AutoMapper;
using Domain;

namespace Application.Common.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<CompanyDto, Company>().ReverseMap();
            CreateMap<SubdivisionDto, Subdivision>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Role, RoleDto>();
            // CreateMap<Good, GoodDto>().ReverseMap();
            CreateMap<Good, GoodDto>()
                .ForMember(gd => gd.CategoryTitle, o => o.MapFrom(g => g.Category.Title));
            CreateMap<GoodDto, Good>();
            // CreateMap<GoodDto, Good>()
            //     .ForMember(g => g.)
            CreateMap<Category, CategoryDto>();
            CreateMap<Request, RequestDto>().ReverseMap();
            CreateMap<Order, OrderDto>();
                // .ForMember(od => od.BuyerCompanyName, o => o.MapFrom(or => or.BuyerContactPerson.Subdivision.Company.Title));
            CreateMap<Request, OrderRequestDto>()
                .ForMember(ord => ord.GoodTitle, o => o.MapFrom(r => r.Good.Title))
                .ForMember(ord => ord.SubdivisionTitle, o => o.MapFrom(r => r.Subdivision.Title));
            CreateMap<User, ContactPersonDto>()
                .ForMember(cpd => cpd.CompanyName, o => o.MapFrom(u => u.Subdivision.Company.Title));
        }
    }
}
