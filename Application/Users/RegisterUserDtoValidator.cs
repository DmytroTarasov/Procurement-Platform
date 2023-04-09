using Application.Dtos;
using FluentValidation;

namespace Application.Users
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("Ім'я є обов'язковим");
            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Прізвище є обов'язковим");
            RuleFor(x => x.MiddleName)
                .NotEmpty()
                .WithMessage("По-батькові є обов'язковим");
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Пошта є обов'язковою")
                .EmailAddress()
                .WithMessage("Формат пошти є невірним");
            RuleFor(x => x.Password)    
                .MinimumLength(8).WithMessage("Мінімальна довжина паролю 8 символів")
                .MaximumLength(32).WithMessage("Максимальна довжина паролю 32 символи")
                .Matches(@"[A-Z]+").WithMessage("Пароль повинен містити хоча б одну велику літеру")
                .Matches(@"[a-z]+").WithMessage("Пароль повинен містити хоча б одну маленьку літеру")
                .Matches(@"[0-9]+").WithMessage("Пароль повинен містити хоча б одну цифру");
        }
    }
}
