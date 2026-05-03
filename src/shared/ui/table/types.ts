export type TEmployee = {
  name: string;
  position: string;
  section: string;
  department: string;
  status: "active" | "vacation";
  city: string;
};

export const employees: TEmployee[] = [
  {
    name: "Иванова Татьяна Романовна",
    position: "Продуктовый менеджер",
    section: "Соц. Франшиза",
    department: "Отдел спецпроектов",
    status: "vacation",
    city: "Москва",
  },
  {
    name: "Иванова Анна Сергеевна",
    position: "Ивент-менеджер",
    section: "СИС: Коммуникации",
    department: "Ивенты",
    status: "active",
    city: "Санкт-Петербург",
  },
  {
    name: "Выборнова Яна Сергеевна",
    position: "Координатор обучения",
    section: "КСП с СПб",
    department: "Центр подготовки",
    status: "vacation",
    city: "Москва",
  },
  {
    name: "Стремяков Михаил Иванович",
    position: "Руководитель региона",
    section: "Соц. Франшиза",
    department: "Отдел регионального развития",
    status: "active",
    city: "Москва",
  },
  {
    name: "Маньшин Александр Олегович",
    position: "Методолог",
    section: "Центр экспертизы",
    department: "Методология и аудит",
    status: "vacation",
    city: "Уфа",
  },
  {
    name: "Иванов Павел Викторович",
    position: "Менеджер по продажам",
    section: "Фандрайзинг и бизнес",
    department: "Бизнес",
    status: "active",
    city: "Казань",
  },
];
