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
