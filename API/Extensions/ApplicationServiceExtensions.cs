using System.Reflection;
using Application.Common.Mapping;
using Application.Common.Services;
using Application.Users;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
        {
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<TokenService>();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddMediatR(typeof(RegisterUserCommandHandler).Assembly);

            services.AddValidatorsFromAssembly(typeof(RegisterUserDtoValidator).Assembly);

            return services;
        }
    }
}
