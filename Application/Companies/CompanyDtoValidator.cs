using Application.Dtos;
using FluentValidation;

namespace Application.Companies
{
    public class CompanyDtoValidator : AbstractValidator<CompanyDto>
    {
        public CompanyDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Назва є обов'язковою");

            RuleFor(x => x.Edrpou)
                .NotEmpty()
                .WithMessage("Код ЄДРПОУ є обов'язковим");    
            
            RuleFor(x => x.City)
                .NotEmpty()
                .WithMessage("Місто є обов'язковим");
            
            RuleFor(x => x.Street)
                .NotEmpty()
                .WithMessage("Вулиця є обов'язковою");   

            RuleFor(x => x.ZipCode)
                .NotEmpty()
                .WithMessage("Поштовий індекс є обов'язковим");
        }
    }   
}
