using System.Text.Json;
using Application.Common.Models;
using Application.Common.Services;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class RegisterUserCommand : IRequest<Result<UserDto>>
    {
        public RegisterUserDto User { get; set; }
    }

    // public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    // {
    //     public RegisterUserCommandValidator()
    //     {
    //         RuleFor(x => x.User).SetValidator(new RegisterUserDtoValidator());
    //     }
    // }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Result<UserDto>>
    {
        private readonly IValidator<RegisterUserDto> _validator;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public RegisterUserCommandHandler(IValidator<RegisterUserDto> validator, UserManager<User> userManager, SignInManager<User> signInManager,
            TokenService tokenService, IMapper mapper)
        {
            _validator = validator;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        public async Task<Result<UserDto>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.User);

            if (!validationResult.IsValid) 
            {
                return Result<UserDto>.ValidationFailure(validationResult.ToDictionary());
            }

            if (await _userManager.FindByEmailAsync(request.User.Email) != null) 
                return Result<UserDto>.Failure("Дана пошта зайнята");

            var user = _mapper.Map<User>(request.User);

            user.UserName = user.Email.Split("@")[0].ToLower();

            var result = await _userManager.CreateAsync(user, request.User.Password);
            if (!result.Succeeded) 
                return Result<UserDto>.Failure("Виникла помилка під час реєстрації. Спробуйте, будь ласка, пізніше");

            var roleResult = await _userManager.AddToRoleAsync(user, request.User.Role);
            if (!roleResult.Succeeded) 
                return Result<UserDto>.Failure("Виникла помилка під час призначення ролі. Спробуйте, будь ласка, пізніше");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Role = request.User.Role;
            userDto.Token = await _tokenService.CreateTokenAsync(user);

            return Result<UserDto>.Success(userDto);
        }
    }
}
