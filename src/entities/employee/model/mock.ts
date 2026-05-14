import type { TEmployee } from "./types.ts";

export const employees: TEmployee[] = [
  {
    id: 1,
    full_name: "Иванова Татьяна Романовна",
    job_title: "Продуктовый менеджер",
    department_name: "Отдел спецпроектов",
    direction_name: "Соц. Франшиза",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "01.01.2026",
    city: "Москва",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
  {
    id: 2,
    full_name: "Иванова Анна Сергеевна",
    job_title: "Ивент-менеджер",
    department_name: "Ивенты",
    direction_name: "СИС: Коммуникации",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "01.01.2026",
    city: "Санкт-Петербург",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
  {
    id: 3,
    full_name: "Выборнова Яна Сергеевна",
    job_title: "Координатор обучения",
    department_name: "Центр подготовки",
    direction_name: "КСП с СПб",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "01.01.2026",
    city: "Москва",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
  {
    id: 4,
    full_name: "Стремяков Михаил Иванович",
    job_title: "Руководитель региона",
    department_name: "Отдел регионального развития",
    direction_name: "Соц. Франшиза",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "01.01.2026",
    city: "Москва",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
  {
    id: 5,
    full_name: "Маньшин Александр Олегович",
    job_title: "Методолог",
    department_name: "Методология и аудит",
    direction_name: "Центр экспертизы",
    photo_url: "/src/shared/assets/images/avatar-1.png",
    status: "vacation",
    birthday_display: "01.01.2026",
    city: "Уфа",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
  {
    id: 6,
    full_name: "Иванов Павел Викторович",
    job_title: "Менеджер по продажам",
    department_name: "Бизнес",
    direction_name: "Фандрайзинг и бизнес",
    photo_url: "/src/shared/assets/images/avatar-2.png",
    status: "active",
    birthday_display: "01.01.2026",
    city: "Казань",
    tags: ["Английский (В2)", "Готов к командировкам"],
  },
];

alert(
  "пока что не понятно, откуда берется поле city, в сваггере от бэка такого поля нет",
);

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
  { name: "Иванова Татьяна", date: "15 мая", fullDate: new Date(2024, 4, 15) },
  { name: "Иванова Анна", date: "15 мая", fullDate: new Date(2024, 4, 12) },
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
