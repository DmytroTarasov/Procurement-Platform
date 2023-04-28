using Application.Common.Mapping;
using Application.Common.Services.Implementations;
using Application.Common.Services.Interfaces;
using Application.Companies;
using Application.Common.Helpers;
using Application.Users;
using FluentValidation;
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
                // opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            services.AddHttpContextAccessor();
            services.AddScoped(typeof(ITokenService), typeof(TokenService));
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(IEmailService), typeof(EmailService));
            services.AddScoped(typeof(IDocumentGeneratorService), typeof(DocumentGeneratorService));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddMediatR(typeof(CreateCompanyCommandHandler).Assembly);

            services.AddValidatorsFromAssembly(typeof(RegisterUserDtoValidator).Assembly);

            services.AddOptions<EmailOptions>().Bind(config.GetSection("EmailOptions"));

            return services;
        }
    }
}
