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
                    new Role { Name = "Адмін" },
                    new Role { Name = "Покупець" },
                    new Role { Name = "Постачальник" },
                    new Role { Name = "Перевізник" }
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
                await userManager.AddToRoleAsync(user, "Адмін");
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

            if (!await context.Categories.AnyAsync()) {
                var categories = new List<Category> {
                    new Category {
                        Title = "Комп'ютерне обладнання",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Принтер"
                            }, 
                            new Good {
                                Title = "Клавіатура"
                            }, 
                            new Good {
                                Title = "Флеш-накопичувач"
                            }, 
                            new Good {
                                Title = "Жорсткий диск"
                            }
                        }
                    },
                    new Category {
                        Title = "Фармацевтична продукція",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Розчин глюкози"
                            }, 
                            new Good {
                                Title = "Інсулін"
                            }, 
                            new Good {
                                Title = "Сульфат магнію"
                            }, 
                        }
                    },
                    new Category {
                        Title = "Офісне устаткування", 
                        Goods = new List<Good> {
                            new Good {
                                Title = "Папір форматний"
                            }, 
                            new Good {
                                Title = "Файл для документів"
                            }, 
                            new Good {
                                Title = "Папка-планшет"
                            }, 
                        }
                    },
                    new Category {
                        Title = "Протипожежне та рятувальне обладнання",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Вогнегасник"
                            }
                        }
                    },
                    new Category {
                        Title = "Освітлювальна апаратура",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Світильник світодіодний"
                            },
                            new Good {
                                Title = "Прожектор світодіодний"
                            },
                            new Good {
                                Title = "Ліхтарик"
                            }
                        }
                    }
                };

                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }
        }
    }
}
