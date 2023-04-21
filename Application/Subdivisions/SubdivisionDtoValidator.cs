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
        }
    }
}
