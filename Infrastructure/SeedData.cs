using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public static class SeedData
    {
        public static async Task SeedAsync(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!await roleManager.Roles.AnyAsync())
            {
                var roles = new List<Role>
                {
                    new Role { Name = UserRoles.Administrator },
                    new Role { Name = UserRoles.Applicant },
                    new Role { Name = UserRoles.Customer },
                    new Role { Name = UserRoles.Supplier },
                    new Role { Name = UserRoles.Transporter }
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
                await userManager.AddToRoleAsync(user, UserRoles.Administrator);
            }

            if (!await context.Companies.AnyAsync())
            {
                var companies = new List<Company> {
                    new Company {
                        Title = "ТОВ 'Каштан'",
                        Edrpou = "34225325",
                        Email = "kashtan@gmail.com",
                        Address = new Address {
                            City = "Київ",
                            Street = "вул. Петра Сагайдачного",
                            BuildingNumber = "11/1",
                            ZipCode = "04124"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Черкаська Філія",
                                Address = new Address {
                                    City = "Черкаси",
                                    Street = "вул. Івана Мазепи",
                                    BuildingNumber = "28",
                                    ZipCode = "18000"
                                }
                            },
                            new Subdivision {
                                Title = "Чернівецька Філія",
                                Address = new Address {
                                    City = "Чернівці",
                                    Street = "вул. Ярослава Мудрого",
                                    BuildingNumber = "12",
                                    ZipCode = "58000"
                                }
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'ЛьвівМаркет'",
                        Edrpou = "40475821",
                        Email = "lvivmarket@ukr.net",
                        Address = new Address {
                            City = "Львів",
                            Street = "вул. Івана Богуна",
                            BuildingNumber = "15",
                            ZipCode = "79000"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Магазин №5",
                                Address = new Address {
                                    City = "Львів",
                                    Street = "вул. Шевченка",
                                    BuildingNumber = "10",
                                    ZipCode = "79000"
                                }
                            },
                            new Subdivision {
                                Title = "Магазин №12",
                                Address = new Address {
                                    City = "Львів",
                                    Street = "вул. Трускавецька",
                                    BuildingNumber = "24",
                                    ZipCode = "79000"
                                }
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'Виробниче Підприємство 'Стандарт''",
                        Edrpou = "35387194",
                        Email = "standart@gmail.com",
                        Address = new Address {
                            City = "Івано-Франківськ",
                            Street = "вул. Дмитра Вітовського",
                            BuildingNumber = "13А",
                            ZipCode = "76018"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Івано-Франківська Філія №1",
                                Address = new Address {
                                    City = "Івано-Франківськ",
                                    Street = "вул. В'ячеслава Чорновола",
                                    BuildingNumber = "79",
                                    ZipCode = "77528"
                                }
                            },
                            new Subdivision {
                                Title = "Івано-Франківська Філія №2",
                                Address = new Address {
                                    City = "Івано-Франківськ",
                                    Street = "вул. Павла Тичини",
                                    BuildingNumber = "46",
                                    ZipCode = "76054"
                                }
                            },
                            new Subdivision {
                                Title = "Хмельницька Філія",
                                Address = new Address {
                                    City = "Хмельницький",
                                    Street = "вул. Івана Франка",
                                    BuildingNumber = "55",
                                    ZipCode = "29000"
                                }
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'КомпТех'",
                        Edrpou = "32906120",
                        Email = "compteh@ukr.net",
                        Address = new Address {
                            City = "Вінниця",
                            Street = "вул. Академіка Янгеля",
                            BuildingNumber = "61",
                            ZipCode = "21000"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Житомирська Філія",
                                Address = new Address {
                                    City = "Житомир",
                                    Street = "вул. Князів Острозьких",
                                    BuildingNumber = "88",
                                    ZipCode = "10001"
                                }
                            },
                            new Subdivision {
                                Title = "Полтавська Філія",
                                Address = new Address {
                                    City = "Полтава",
                                    Street = "вул. Пилипа Орлика",
                                    BuildingNumber = "31",
                                    ZipCode = "36000"
                                }
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'Транс-Експрес'",
                        Edrpou = "42589102",
                        Email = "transexpress@gmail.com",
                        Address = new Address {
                            City = "Дніпро",
                            Street = "вул. Михайла Грушевського",
                            BuildingNumber = "40",
                            ZipCode = "49000"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Відділ перевезень",
                                Address = new Address {
                                    City = "Дніпро",
                                    Street = "вул. Михайла Грушевського",
                                    BuildingNumber = "40",
                                    ZipCode = "49000"
                                }
                            }
                        }
                    },
                    new Company {
                        Title = "АТ 'Страхова компанія 'СМЕРЕКА''",
                        Edrpou = "31826406",
                        Email = "smereka@gmail.com",
                        Address = new Address {
                            City = "Луцьк",
                            Street = "вул. Кривий Вал",
                            BuildingNumber = "51",
                            ZipCode = "43000"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Білоцерківська Філія",
                                Address = new Address {
                                    City = "Біла Церква",
                                    Region = "Київська",
                                    Street = "вул. Лесі Українки",
                                    BuildingNumber = "32",
                                    ZipCode = "09100"
                                },
                            },
                            new Subdivision {
                                Title = "Вінницька Філія",
                                Address = new Address {
                                    City = "Вінниця",
                                    Street = "вул. Соборна",
                                    BuildingNumber = "24",
                                    ZipCode = "21000"
                                },
                            }
                        }
                    },
                    new Company {
                        Title = "ТОВ 'НадЗахист'",
                        Edrpou = "36719285",
                        Email = "nadzakhyst@ukr.net",
                        Address = new Address {
                            City = "Тернопіль",
                            Street = "вул. Вільхова",
                            BuildingNumber = "39",
                            ZipCode = "46001"
                        },
                        Subdivisions = new List<Subdivision> {
                            new Subdivision {
                                Title = "Чернівецька Філія",
                                Address = new Address {
                                    City = "Чернівці",
                                    Street = "вул. Григорія Сковороди",
                                    BuildingNumber = "10",
                                    ZipCode = "58000"
                                },
                            },
                            new Subdivision {
                                Title = "Одеська Філія",
                                Address = new Address {
                                    City = "Одеса",
                                    Street = "вул. Космонавтів",
                                    BuildingNumber = "4",
                                    ZipCode = "65000"
                                },
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
                        Type = CategoryType.Goods,
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
                        Title = "Одяг",
                        Type = CategoryType.Goods,
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Робочий комбінезон"
                            },
                            new ProcurementItem {
                                Title = "Сорочка"
                            },
                            new ProcurementItem {
                                Title = "Футболка"
                            }
                        }
                    },
                    new Category {
                        Title = "Меблі",
                        Type = CategoryType.Goods,
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
                        Type = CategoryType.Goods,
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
                    },
                    new Category {
                        Title = "Страхові послуги",
                        Type = CategoryType.Services,
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Медичне страхування"
                            },
                            new ProcurementItem {
                                Title = "Страхування від нещасних випадків"
                            },
                            new ProcurementItem {
                                Title = "Страхування життя"
                            }
                        }
                    },
                    new Category {
                        Title = "Охоронні послуги",
                        Type = CategoryType.Services,
                        ProcurementItems = new List<ProcurementItem> {
                            new ProcurementItem {
                                Title = "Охорона приміщення"
                            },
                            new ProcurementItem {
                                Title = "Охорона території"
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
                        Budget = 7200,
                        CreatedAt = DateTime.UtcNow.AddDays(-10).AddHours(-2)
                    },
                    new Request {
                        Description = "Потрібен багатофункціональний принтер. Бажано чорного кольору.",
                        SubdivisionId = 7,
                        ProcurementItemId = 4,
                        Quantity = 1,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 3400,
                        CreatedAt = DateTime.UtcNow.AddDays(-9).AddHours(-1)
                    },
                    new Request {
                        Description = "Потрібні дротові клавіатури, з гарантією. Мова розкладки - українська та англійська.",
                        SubdivisionId = 6,
                        ProcurementItemId = 2,
                        Quantity = 15,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 10000,
                        CreatedAt = DateTime.UtcNow.AddDays(-8).AddHours(-4)
                    },
                    new Request {
                        Description = "Потрібні робочі комбінезони. Бажано синього кольору.",
                        SubdivisionId = 3,
                        ProcurementItemId = 6,
                        Quantity = 100,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 100000,
                        CreatedAt = DateTime.UtcNow.AddDays(-6).AddHours(-6)
                    },
                    new Request {
                        Description = "Потрібні футболки зеленого кольору. Розмір 46-52.",
                        SubdivisionId = 3,
                        ProcurementItemId = 8,
                        Quantity = 100,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 20000,
                        CreatedAt = DateTime.UtcNow.AddDays(-5).AddHours(2)
                    },
                    new Request {
                        Description = "Необхідні сорочки білого кольору. Розмір 46-52.",
                        SubdivisionId = 4,
                        ProcurementItemId = 7,
                        Quantity = 50,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 15000,
                        CreatedAt = DateTime.UtcNow.AddDays(-4).AddHours(3)
                    },
                    new Request {
                        Description = "Необхідні комп'ютерні столи, ширина - 140см, із заокругленими кутами.",
                        SubdivisionId = 7,
                        ProcurementItemId = 9,
                        Quantity = 40,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 120000,
                        CreatedAt = DateTime.UtcNow.AddDays(-11).AddHours(-3)
                    },
                    new Request {
                        Description = "Потрібні офісні крісла, матеріал - шкіра, чорного кольору, з посиленою основою.",
                        SubdivisionId = 5,
                        ProcurementItemId = 10,
                        Quantity = 40,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 200000,
                        CreatedAt = DateTime.UtcNow.AddDays(-3).AddHours(1)
                    },
                    new Request {
                        Description = "Потрібні літні шини 235/65R17 108H",
                        SubdivisionId = 5,
                        ProcurementItemId = 15,
                        Quantity = 10,
                        MeasurementUnit = MeasurementUnit.Pieces,
                        Budget = 57000,
                        CreatedAt = DateTime.UtcNow.AddDays(-2).AddHours(7)
                    },
                    
                    new Request {
                        Description = "Послуги медичного страхування працівників (100 осіб)",
                        SubdivisionId = 3,
                        ProcurementItemId = 16,
                        Quantity = 1,
                        MeasurementUnit = MeasurementUnit.Service,
                        Budget = 16000,
                        CreatedAt = DateTime.UtcNow.AddDays(-1).AddHours(8)
                    },
                    new Request {
                        Description = "Цілодобова охорона приміщення з 01-07-2023 до 31-12-2023.",
                        SubdivisionId = 6,
                        ProcurementItemId = 19,
                        Quantity = 1,
                        MeasurementUnit = MeasurementUnit.Service,
                        Budget = 105000
                    }
                };

                context.Requests.AddRange(requests);
                await context.SaveChangesAsync();
            }
        }
    }
}
