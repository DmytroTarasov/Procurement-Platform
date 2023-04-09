using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class SeedData
    {
        public static async Task SeedAsync(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!await roleManager.Roles.AnyAsync()) {
                var roles = new List<Role>
                {
                    new Role { Name = "Admin" },
                    new Role { Name = "Buyer" },
                    new Role { Name = "Supplier" },
                    new Role { Name = "Transporter" }
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            if (!await userManager.Users.AnyAsync()) {
                var user = new User {
                    LastName = "Кузьменко", 
                    FirstName = "Олексій", 
                    MiddleName = "Павлович", 
                    Email = "opavlovych@gmail.com",
                    UserName = "opavlovych"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Admin");
            }

            if (!await context.Companies.AnyAsync()) {
                var company = new Company {
                    Title = "ТОВ 'ДТЕК Енерго'", 
                    Edrpou = "34225325",
                    City = "Київ",
                    Street = "Вул. Петра Сагайдачного", 
                    Apartment = "11/1",
                    ZipCode = "09124",
                    Subdivisions = new List<Subdivision> {
                        new Subdivision {
                            Title = "Підрозділ 1", 
                            City = "Вінниця",
                            Street = "Вул. Івана Мазепи", 
                            Apartment = "28",
                            ZipCode = "05671"
                        },
                        new Subdivision {
                            Title = "Підрозділ 2", 
                            City = "Житомир",
                            Street = "Вул. Олекси Тихого", 
                            Apartment = "12",
                            ZipCode = "06512"
                        },
                    }
                };
                await context.Companies.AddAsync(company);
                await context.SaveChangesAsync();
            }
        }
    }
}
