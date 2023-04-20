using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class SeedData
    {
        public static async Task SeedAsync(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!await roleManager.Roles.AnyAsync())
            {
                var roles = new List<Role>
                {
                    new Role { Name = "Адміністратор" },
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

            if (!await userManager.Users.AnyAsync())
            {
                var user = new User
                {
                    LastName = "Кузьменко",
                    FirstName = "Олексій",
                    MiddleName = "Павлович",
                    Email = "opavlovych@gmail.com",
                    UserName = "opavlovych"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Адміністратор");
            }

            if (!await context.Companies.AnyAsync())
            {
                var companies = new List<Company> {
                    new Company {
                        Title = "ТОВ 'Каштан'",
                        Edrpou = "34225325",
                        City = "Київ",
                        Street = "Вул. Петра Сагайдачного",
                        Apartment = "11/1",
                        ZipCode = "04124",
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Черкаська Філія",
                                City = "Черкаси",
                                Street = "Вул. Івана Мазепи",
                                Apartment = "28",
                                ZipCode = "18000"
                            },
                            new Subdivision {
                                Title = "Чернівецька Філія",
                                City = "Чернівці",
                                Street = "Вул. Ярослава Мудрого",
                                Apartment = "12",
                                ZipCode = "58000"
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'ЛьвівМаркет'",
                        Edrpou = "40475821",
                        City = "Львів",
                        Street = "Вул. Івана Богуна",
                        Apartment = "15",
                        ZipCode = "79000",
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Магазин №5",
                                City = "Львів",
                                Street = "Вул. Шевченка",
                                Apartment = "10",
                                ZipCode = "79000"
                            },
                            new Subdivision {
                                Title = "Магазин №12",
                                City = "Львів",
                                Street = "Вул. Трускавецька",
                                Apartment = "24",
                                ZipCode = "79000"
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'Виробниче Підприємство 'Стандарт''",
                        Edrpou = "35387194",
                        City = "Івано-Франківськ",
                        Street = "Вул. Дмитра Вітовського",
                        Apartment = "13А",
                        ZipCode = "76018",
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Івано-Франківська Філія №1",
                                City = "Івано-Франківськ",
                                Street = "Вул. В'ячеслава Чорновола",
                                Apartment = "79",
                                ZipCode = "77528"
                            },
                            new Subdivision {
                                Title = "Івано-Франківська Філія №2",
                                City = "Івано-Франківськ",
                                Street = "Вул. Павла Тичини",
                                Apartment = "46",
                                ZipCode = "76054"
                            },
                            new Subdivision {
                                Title = "Хмельницька Філія",
                                City = "Хмельницький",
                                Street = "Вул. Івана Франка",
                                Apartment = "55",
                                ZipCode = "29000"
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'КомпТех'",
                        Edrpou = "32906120",
                        City = "Вінниця",
                        Street = "Вул. Академіка Янгеля",
                        Apartment = "61",
                        ZipCode = "21000",
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Житомирська Філія",
                                City = "Житомир",
                                Street = "Вул. Князів Острозьких",
                                Apartment = "88",
                                ZipCode = "10001"
                            },
                            new Subdivision {
                                Title = "Полтавська Філія",
                                City = "Полтава",
                                Street = "Вул. Пилипа Орлика",
                                Apartment = "31",
                                ZipCode = "36000"
                            }
                        }
                    },
                };

                context.Companies.AddRange(companies);
                await context.SaveChangesAsync();
            }

            if (!await context.Categories.AnyAsync())
            {
                var categories = new List<Category> {
                    new Category {
                        Title = "Комп'ютерна техніка",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Джерело безперебійного живлення"
                            },
                            new Good {
                                Title = "Клавіатура"
                            },
                            new Good {
                                Title = "Монітор"
                            }, 
                            new Good {
                                Title = "Принтер"
                            },
                            new Good {
                                Title = "Комп'ютер настільний"
                            }
                        }
                    },
                    new Category {
                        Title = "Одяг та взуття",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Кросівки"
                            },
                            new Good {
                                Title = "Робочий комбінезон"
                            },
                            new Good {
                                Title = "Сорочка"
                            },
                            new Good {
                                Title = "Футболка"
                            },
                            new Good {
                                Title = "Туфлі"
                            }
                        }
                    },
                    new Category {
                        Title = "Меблі",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Стіл"
                            },
                            new Good {
                                Title = "Крісло"
                            },
                            new Good {
                                Title = "Тумба"
                            },
                            new Good {
                                Title = "Шафа"
                            }
                        }
                    },
                    new Category {
                        Title = "Транспорт",
                        Goods = new List<Good> {
                            new Good {
                                Title = "Амортизатор"
                            },
                            new Good {
                                Title = "Акумулятор"
                            },
                            new Good {
                                Title = "Шини"
                            }
                        }
                    }
                };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }

            if (!await context.Requests.AnyAsync())
            {
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
