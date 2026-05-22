import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";

// Моковые данные для сотрудников
const mockEmployees = [
  {
    id: 1,
    city: "Москва",
    linearManager: "Петрова Анна Сергеевна",
    name: "Иванов Иван Иванович",
    position: "Ведущий разработчик",
    franchise: "Франшиза №1",
    department: "IT-департамент",
    status: "working" as const,
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    isArchived: false,
  },
  {
    id: 2,
    city: "Санкт-Петербург",
    linearManager: "Сидорова Елена Владимировна",
    name: "Петрова Мария Алексеевна",
    position: "HR-менеджер",
    franchise: "Франшиза №2",
    department: "HR-департамент",
    status: "vacation" as const,
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    isArchived: false,
  },
  {
    id: 3,
    city: "Казань",
    linearManager: "Кузнецова Ольга Петровна",
    name: "Сидоров Алексей Викторович",
    position: "Бухгалтер",
    franchise: "Франшиза №1",
    department: "Финансовый департамент",
    status: "bizTrip" as const,
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    isArchived: false,
  },
  {
    id: 4,
    city: "Новосибирск",
    linearManager: "Новикова Анна Владимировна",
    name: "Козлова Екатерина Дмитриевна",
    position: "Маркетолог",
    franchise: "Франшиза №3",
    department: "Маркетинговый департамент",
    status: "sick" as const,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    isArchived: true,
  },
  {
    id: 5,
    city: "Екатеринбург",
    linearManager: "Морозов Сергей Андреевич",
    name: "Соколов Дмитрий Павлович",
    position: "Аналитик",
    franchise: "Франшиза №2",
    department: "Аналитический департамент",
    status: "working" as const,
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    isArchived: false,
  },
  {
    id: 6,
    city: "Нижний Новгород",
    linearManager: "Петрова Анна Сергеевна",
    name: "Волкова Анна Игоревна",
    position: "Дизайнер",
    franchise: "Франшиза №1",
    department: "Дизайн-департамент",
    status: "vacation" as const,
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    isArchived: false,
  },
];

// Моковые данные для вакансий
const mockVacancies = [
  {
    id: 101,
    city: "Москва",
    profession: "Senior Frontend Developer",
    position: "Ведущий разработчик",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
    isArchived: false,
  },
  {
    id: 102,
    city: "Санкт-Петербург",
    profession: "Product Manager",
    position: "Менеджер продукта",
    franchise: "Франшиза Продукты",
    department: "Продуктовый департамент",
    isArchived: false,
  },
  {
    id: 103,
    city: "Удаленно",
    profession: "UX/UI Designer",
    position: "Дизайнер",
    franchise: "Франшиза Дизайн",
    department: "Дизайн-департамент",
    isArchived: false,
  },
  {
    id: 104,
    city: "Москва",
    profession: "QA Engineer",
    position: "Инженер по тестированию",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
    isArchived: true,
  },
  {
    id: 105,
    city: "Санкт-Петербург",
    profession: "DevOps Engineer",
    position: "DevOps инженер",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
    isArchived: false,
  },
  {
    id: 106,
    city: "Казань",
    profession: "HR Generalist",
    position: "HR-специалист",
    franchise: "Франшиза №2",
    department: "HR-департамент",
    isArchived: false,
  },
];

// ID избранного
const mockFavorites = [1, 3, 102, 105];

const EmployeesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Книга сотрудников"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={
          <HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />
        }
      />

      <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
        <Navbar unitsList={orgTree} />

        <EmployeesList
          employees={mockEmployees}
          vacancies={mockVacancies}
          favoritesIds={mockFavorites}
        />
      </div>
    </div>
  );
};

export const Component = EmployeesPage;
