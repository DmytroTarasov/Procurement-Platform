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
            CreateMap<ProcurementItem, ProcurementItemDto>()
                .ForMember(gd => gd.CategoryTitle, o => o.MapFrom(g => g.Category.Title));
            CreateMap<ProcurementItemDto, ProcurementItem>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Request, RequestDto>().ReverseMap();
            CreateMap<Order, OrderDto>();
            CreateMap<Request, OrderRequestDto>()
                .ForMember(ord => ord.ProcurementItemTitle, o => o.MapFrom(r => r.ProcurementItem.Title))
                .ForMember(ord => ord.SubdivisionTitle, o => o.MapFrom(r => r.Subdivision.Title));
            CreateMap<User, ContactPersonDto>()
                .ForMember(cpd => cpd.CompanyName, o => o.MapFrom(u => u.Subdivision.Company.Title));
        }
    }
}
