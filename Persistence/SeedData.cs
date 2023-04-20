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
                    new Role { Name = "Заявник" },
                    new Role { Name = "Замовник" },
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
                context.Companies.Add(company);
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

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }

            if (!await context.Requests.AnyAsync()) {
                var requests = new List<Request> {
                    new Request {
                        Description = "Потрібен жорсткий диск", 
                        SubdivisionId = 1,
                        GoodId = 4,
                        Quantity = 10,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 10000
                    },
                    new Request {
                        Description = "Потрібні принтери чорного кольору", 
                        SubdivisionId = 1,
                        GoodId = 1,
                        Quantity = 5,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 15000
                    },    
                    new Request {
                        Description = "Потрібні клавіатури під стаціонарний комп'ютер", 
                        SubdivisionId = 2,
                        GoodId = 2,
                        Quantity = 30,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 32000
                    },
                    new Request {
                        Description = "Потрібні клавіатури білого кольору у шкільний комп'ютерний клас", 
                        SubdivisionId = 1,
                        GoodId = 2,
                        Quantity = 20,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 30000
                    },
                    new Request {
                        Description = "Потрібний папір форматний", 
                        SubdivisionId = 1,
                        GoodId = 8,
                        Quantity = 2000,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 10000
                    },  
                    new Request {
                        Description = "Потрібні папки-планшети", 
                        SubdivisionId = 2,
                        GoodId = 10,
                        Quantity = 4,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 1000
                    }, 
                    new Request {
                        Description = "Необхідний вогнегасник", 
                        SubdivisionId = 1,
                        GoodId = 11,
                        Quantity = 1,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 1500
                    }, 
                    new Request {
                        Description = "Потрібні файли для документів", 
                        SubdivisionId = 2,
                        GoodId = 9,
                        Quantity = 100,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 4000
                    }                                     
                };

                context.Requests.AddRange(requests);
                await context.SaveChangesAsync();
            }
        }
    }
}
