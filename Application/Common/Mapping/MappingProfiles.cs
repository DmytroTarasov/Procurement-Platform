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
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CompanyDto, Company>().ReverseMap();
            CreateMap<SubdivisionDto, Subdivision>().ReverseMap();
            CreateMap<User, UserDto>()
                .ForMember(ud => ud.CompanyId, o => o.MapFrom(u => u.Subdivision.CompanyId));
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
                .ForMember(cpd => cpd.CompanyId, o => o.MapFrom(u => u.Subdivision.CompanyId))
                .ForMember(cpd => cpd.CompanyName, o => o.MapFrom(u => u.Subdivision.Company.Title))
                .ForMember(cpd => cpd.CompanyEdrpou, o => o.MapFrom(u => u.Subdivision.Company.Edrpou))
                .ForMember(cpd => cpd.CompanyAddress, o => o.MapFrom(u => u.Subdivision.Company.Address));  
            CreateMap<Proposal, ProposalDto>()
                .ForMember(pd => pd.SupplierContactPerson, o => o.MapFrom(p => p.Supplier))
                .ForMember(pd => pd.TransporterContactPerson, o => o.MapFrom(p => p.Transporter));  
        }

        // private static string GetCompanyAddress(User u)
        // {
        //     return string.IsNullOrEmpty(u.Subdivision.Company.Apartment)
        //         ? $"{u.Subdivision.Company.City}, ${u.Subdivision.Company.Street}"
        //         : $"{u.Subdivision.Company.City}, ${u.Subdivision.Company.Street}, ${u.Subdivision.Company.Apartment}";
        // }
    }
}
