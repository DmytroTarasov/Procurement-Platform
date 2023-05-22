using Application.Common.Mapping;
using Application.Common.Services.Implementations;
using Application.Common.Services.Interfaces;
using Application.Companies;
using Application.Common.Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using Infrastructure.Interfaces;
using Infrastructure.Implementations;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
        {
            services.AddDbContext<DataContext>(opt => 
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                
                if (env == "Development") {
                    opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                } else {
                    var connString = Environment.GetEnvironmentVariable("DATABASE_URL");

                    connString = connString.Replace("postgres://", "");
                    var pgUserPass = connString.Split("@")[0];
                    var pgHostPortDb = connString.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];
	                var updatedHost = pgHost.Replace("flycast", "internal");

                    connString = $"Server={updatedHost}; Port={pgPort}; User Id={pgUser}; Password={pgPass}; Database={pgDb}";
                    opt.UseNpgsql(connString);
                }
            });

            services.AddHttpContextAccessor();
            services.AddScoped(typeof(ITokenService), typeof(TokenService));
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(IEmailService), typeof(EmailService));
            services.AddScoped(typeof(IDocumentGeneratorService), typeof(DocumentGeneratorService));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddMediatR(typeof(CreateCompanyCommandHandler).Assembly);

            services.AddOptions<EmailOptions>().Bind(config.GetSection("EmailOptions"));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IProcurementItemRepository, ProcurementItemRepository>();
            services.AddScoped<ISubdivisionRepository, SubdivisionRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRequestRepository, RequestRepository>();
            services.AddScoped<IProposalRepository, ProposalRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();

            return services;
        }
    }
}
