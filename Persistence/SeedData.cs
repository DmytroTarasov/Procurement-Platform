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
                    new Company {
                        Title = "ТОВ 'Транс-Експрес'",
                        Edrpou = "42589102",
                        City = "Дніпро",
                        Street = "Вул. Михайла Грушевського",
                        Apartment = "40",
                        ZipCode = "49000",
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Відділ перевезень",
                                City = "Дніпро",
                                Street = "Вул. Михайла Грушевського",
                                Apartment = "40",
                                ZipCode = "49000"
                            }
                        }
                    }
                };

                context.Companies.AddRange(companies);
                await context.SaveChangesAsync();
            }

            if (!await context.Categories.AnyAsync())
            {
                var categories = new List<Category> {
                    new Category {
                        Title = "Комп'ютерна техніка",
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Джерело безперебійного живлення"
                            },
                            new ProcurementItem {
                                Title = "Клавіатура"
                            },
                            new ProcurementItem {
                                Title = "Монітор"
                            }, 
                            new ProcurementItem {
                                Title = "Принтер"
                            },
                            new ProcurementItem {
                                Title = "Комп'ютер настільний"
                            }
                        }
                    },
                    new Category {
                        Title = "Одяг та взуття",
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Кросівки"
                            },
                            new ProcurementItem {
                                Title = "Робочий комбінезон"
                            },
                            new ProcurementItem {
                                Title = "Сорочка"
                            },
                            new ProcurementItem {
                                Title = "Футболка"
                            },
                            new ProcurementItem {
                                Title = "Туфлі"
                            }
                        }
                    },
                    new Category {
                        Title = "Меблі",
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Стіл"
                            },
                            new ProcurementItem {
                                Title = "Крісло"
                            },
                            new ProcurementItem {
                                Title = "Тумба"
                            },
                            new ProcurementItem {
                                Title = "Шафа"
                            }
                        }
                    },
                    new Category {
                        Title = "Транспорт",
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Амортизатор"
                            },
                            new ProcurementItem {
                                Title = "Акумулятор"
                            },
                            new ProcurementItem {
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
                        Description = "ДБЖ, 750 ВА. Обов'язково повинна бути гарантія.",
                        SubdivisionId = 5,
                        ProcurementItemId = 1,
                        Quantity = 2,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 7200
                    },
                    new Request {
                        Description = "Потрібен багатофункціональний принтер. Бажано чорного кольору.",
                        SubdivisionId = 6,
                        ProcurementItemId = 4,
                        Quantity = 1,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 3400
                    },
                    new Request {
                        Description = "Потрібні дротові клавіатури, з гарантією. Мова розкладки - українська та англійська.",
                        SubdivisionId = 7,
                        ProcurementItemId = 2,
                        Quantity = 15,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 10000
                    },
                    new Request {
                        Description = "Потрібні монітори. 23.8 дюймів. Роздільна здатність 1920x1080.",
                        SubdivisionId = 7,
                        ProcurementItemId = 3,
                        Quantity = 20,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 100000
                    },
                    new Request {
                        Description = "Потрібні робочі комбінезони. Бажано синього кольору.",
                        SubdivisionId = 3,
                        ProcurementItemId = 7,
                        Quantity = 100,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 100000
                    },
                    new Request {
                        Description = "Потрібні футболки зеленого кольору. Розмір 46-52.",
                        SubdivisionId = 3,
                        ProcurementItemId = 9,
                        Quantity = 100,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 20000
                    },
                    new Request {
                        Description = "Необхідні сорочки білого кольору. Розмір 46-52.",
                        SubdivisionId = 4,
                        ProcurementItemId = 8,
                        Quantity = 50,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 15000
                    },
                    new Request {
                        Description = "Необхідні комп'ютерні столи, ширина - 140см, із заокругленими кутами.",
                        SubdivisionId = 6,
                        ProcurementItemId = 11,
                        Quantity = 40,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 120000
                    },
                    new Request {
                        Description = "Потрібні офісні крісла, матеріал - шкіра, чорного кольору, з посиленою основою.",
                        SubdivisionId = 5,
                        ProcurementItemId = 12,
                        Quantity = 40,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 200000
                    },
                    new Request {
                        Description = "Потрібні літні шини 235/65R17 108H",
                        SubdivisionId = 5,
                        ProcurementItemId = 17,
                        Quantity = 10,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 57000
                    },
                };

                context.Requests.AddRange(requests);
                await context.SaveChangesAsync();
            }
        }
    }
}
