import type { TEmployee, TShortEmployee } from "./types.ts";

export const employees: TEmployee[] = [
  {
    id: 1,
    full_name: "Иванова Татьяна Романовна",
    job_title: "Продуктовый менеджер",
    department_name: "Отдел спецпроектов",
    direction_name: "Соц. Франшиза",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "14.05.1990",
    city: "Москва",
    tags: ["Английский (В2)", "Готов к командировкам"],
    email_corporate: "t.ivanova@company.com",
    email_personal: "t.ivanova@gmail.com",
    phone_corporate: "+7 (495) 123-45-67",
    phone_personal: "+7 (916) 123-45-67",
    birthday: "1990-05-14",
    competencies: ["english_b1", "presentation", "public_speaking"],
    linear_manager: "Ольга Смирнова",
  },
  {
    id: 2,
    full_name: "Иванова Анна Сергеевна",
    job_title: "Ивент-менеджер",
    department_name: "Ивенты",
    direction_name: "СИС: Коммуникации",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "17.05.1992",
    city: "Санкт-Петербург",
    tags: ["Английский (С1)", "Готов к командировкам"],
    email_corporate: "a.ivanova@company.com",
    email_personal: "a.ivanova@yandex.ru",
    phone_corporate: "+7 (812) 234-56-78",
    phone_personal: "+7 (921) 234-56-78",
    birthday: "1992-05-17",
    competencies: ["event_management", "team_leadership", "english_c1"],
    linear_manager: "Анна Ковалева",
  },
  {
    id: 3,
    full_name: "Выборнова Яна Сергеевна",
    job_title: "Координатор обучения",
    department_name: "Центр подготовки",
    direction_name: "КСП с СПб",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "14.05.1988",
    city: "Москва",
    tags: ["Методология", "Коучинг"],
    email_corporate: "y.vybornova@company.com",
    email_personal: "y.vybornova@gmail.com",
    phone_corporate: "+7 (495) 345-67-89",
    phone_personal: "+7 (903) 345-67-89",
    birthday: "1988-05-14",
    competencies: ["methodology", "coach", "adult_education"],
    linear_manager: "Ольга Смирнова",
  },
  {
    id: 4,
    full_name: "Стремяков Михаил Иванович",
    job_title: "Руководитель региона",
    department_name: "Отдел регионального развития",
    direction_name: "Соц. Франшиза",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "19.05.1985",
    city: "Москва",
    tags: ["Управление", "Стратегия"],
    email_corporate: "m.stremyakov@company.com",
    email_personal: "m.stremyakov@mail.ru",
    phone_corporate: "+7 (495) 456-78-90",
    phone_personal: "+7 (926) 456-78-90",
    birthday: "1985-05-19",
    competencies: ["scaling", "grant", "business"],
    linear_manager: "Дмитрий Петров",
  },
  {
    id: 5,
    full_name: "Маньшин Александр Олегович",
    job_title: "Методолог",
    department_name: "Методология и аудит",
    direction_name: "Центр экспертизы",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "25.05.1991",
    city: "Уфа",
    tags: ["Аудит", "Методология"],
    email_corporate: "a.manshin@company.com",
    email_personal: "a.manshin@gmail.com",
    phone_corporate: "+7 (347) 234-56-78",
    phone_personal: "+7 (917) 234-56-78",
    birthday: "1991-05-25",
    competencies: ["research_work", "methodology", "audit"],
    linear_manager: "Екатерина Михайлова",
  },
  {
    id: 6,
    full_name: "Иванов Павел Викторович",
    job_title: "Менеджер по продажам",
    department_name: "Бизнес",
    direction_name: "Фандрайзинг и бизнес",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "14.05.1993",
    city: "Казань",
    tags: ["Продажи", "Переговоры"],
    email_corporate: "p.ivanov@company.com",
    email_personal: "p.ivanov@bk.ru",
    phone_corporate: "+7 (843) 345-67-89",
    phone_personal: "+7 (987) 345-67-89",
    birthday: "1993-05-14",
    competencies: ["business", "fundraising", "presentation"],
    linear_manager: "Сергей Иванов",
  },
];

export const shortEmployees: TShortEmployee[] = [
  {
    id: 1,
    name: "Пётр Михайлов",
    job: "Координатор",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 2,
    name: "Анна Иванова",
    job: "Менеджер",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 3,
    name: "Алексей Морозов",
    job: "QA инженер",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 4,
    name: "Мария Соколова",
    job: "Координатор",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 5,
    name: "Дмитрий Кузнецов",
    job: "Менеджер",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 6,
    name: "Екатерина Орлова",
    job: "QA инженер",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 7,
    name: "Илья Смирнов",
    job: "Координатор",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 8,
    name: "Ольга Васильева",
    job: "Менеджер",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 9,
    name: "Никита Павлов",
    job: "QA инженер",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 10,
    name: "Елизавета Алексеева",
    job: "Координатор движа",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 11,
    name: "Сергей Фёдоров",
    job: "Менеджер",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 12,
    name: "Алина Белова",
    job: "QA инженер",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 13,
    name: "Константин Волков",
    job: "Координатор",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 14,
    name: "Дарья Новикова",
    job: "Менеджер",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
  {
    id: 15,
    name: "Роман Захаров",
    job: "QA инженер",
    photo: "/src/shared/assets/images/avatar-2.png",
  },
  {
    id: 16,
    name: "Юлия Крылова",
    job: "Координатор",
    photo: "/src/shared/assets/images/avatar-1.png",
  },
];

export interface BirthdayPerson {
  name: string;
  date: string; // формат "DD MMM"
  fullDate: Date;
}

// Моковые данные дней рождений
export const MOCK_BIRTHDAYS: BirthdayPerson[] = [
  // Майские дни рождения
  { name: "Выборнова Яна", date: "14 мая", fullDate: new Date(2024, 4, 14) },
  { name: "Иванов Павел", date: "14 мая", fullDate: new Date(2024, 4, 14) },
  { name: "Иванова Татьяна", date: "16 мая", fullDate: new Date(2024, 4, 16) },
  { name: "Иванова Анна", date: "17 мая", fullDate: new Date(2024, 4, 17) },
  { name: "Стремяков Михаил", date: "19 мая", fullDate: new Date(2024, 4, 19) },
  {
    name: "Меньшин Александр",
    date: "25 мая",
    fullDate: new Date(2024, 4, 25),
  },
];

// Получить дни рождения текущего месяца
export const getCurrentMonthBirthdays = (): BirthdayPerson[] => {
  const currentMonth = new Date().getMonth();
  return MOCK_BIRTHDAYS.filter(
    (birthday) => birthday.fullDate.getMonth() === currentMonth,
  );
};

// Получить дни рождения сегодня
export const getTodayBirthdays = (): BirthdayPerson[] => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  return MOCK_BIRTHDAYS.filter((birthday) => {
    const birthdayDate = birthday.fullDate;
    return (
      birthdayDate.getMonth() === todayMonth &&
      birthdayDate.getDate() === todayDay
    );
  });
};

// Получить ближайшие дни рождения (следующие 7 дней)
export const getUpcomingBirthdays = (days: number = 7): BirthdayPerson[] => {
  const today = new Date();
  const currentYear = today.getFullYear();

  return MOCK_BIRTHDAYS.filter((birthday) => {
    const birthdayThisYear = new Date(
      currentYear,
      birthday.fullDate.getMonth(),
      birthday.fullDate.getDate(),
    );

    // Если ДР уже был в этом году, берем следующий год
    if (birthdayThisYear < today) {
      birthdayThisYear.setFullYear(currentYear + 1);
    }

    const diffDays = Math.ceil(
      (birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diffDays <= days && diffDays >= 0;
  }).sort((a, b) => {
    const dateA = new Date(
      currentYear,
      a.fullDate.getMonth(),
      a.fullDate.getDate(),
    );
    const dateB = new Date(
      currentYear,
      b.fullDate.getMonth(),
      b.fullDate.getDate(),
    );
    if (dateA < today) dateA.setFullYear(currentYear + 1);
    if (dateB < today) dateB.setFullYear(currentYear + 1);
    return dateA.getTime() - dateB.getTime();
  });
};
