using Application.Dtos;
using FluentValidation;

namespace Application.Subdivisions
{
    public class SubdivisionDtoValidator : AbstractValidator<SubdivisionDto>
    {
        public SubdivisionDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Назва є обов'язковою");
            
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
