import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";
import type { EmployeeCardProps } from "@/widgets/employee-card";

const mockEmployees: EmployeeCardProps[] = [
  {
    id: 1,
    city: "Москва",
    name: "Иванов Иван Иванович",
    position: "Ведущий разработчик",
    franchise: "Франшиза №1",
    department: "IT-департамент",
    linearManager: "Петрова Анна Сергеевна",
    status: "working",
  },
  {
    id: 2,
    city: "Санкт-Петербург",
    name: "Петрова Мария Алексеевна",
    position: "HR-менеджер",
    franchise: "Франшиза №2",
    department: "HR-департамент",
    linearManager: "Сидорова Елена Владимировна",
    status: "vacation",
  },
  {
    id: 3,
    city: "Казань",
    name: "Сидоров Алексей Викторович",
    position: "Бухгалтер",
    franchise: "Франшиза №1",
    department: "Финансовый департамент",
    linearManager: "Кузнецова Ольга Петровна",
    status: "bizTrip",
  },
];

const mockVacancies = [
  {
    id: 4,
    city: "Москва",
    profession: "Senior Frontend Developer",
    position: "Ведущий разработчик",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
  },
  {
    id: 5,
    city: "Санкт-Петербург",
    profession: "Product Manager",
    position: "Менеджер продукта",
    franchise: "Франшиза Продукты",
    department: "Продуктовый департамент",
  },
  {
    id: 6,
    city: "Удаленно",
    profession: "UX/UI Designer",
    position: "Дизайнер",
    franchise: "Франшиза Дизайн",
    department: "Дизайн-департамент",
  },
  {
    id: 7,
    city: "Москва",
    profession: "QA Engineer",
    position: "Инженер по тестированию",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
  },
  {
    id: 8,
    city: "Санкт-Петербург",
    profession: "DevOps Engineer",
    position: "DevOps инженер",
    franchise: "Франшиза Технологии",
    department: "IT Департамент",
  },
  {
    id: 9,
    city: "Казань",
    profession: "HR Generalist",
    position: "HR-специалист",
    franchise: "Франшиза №2",
    department: "HR-департамент",
  },
  {
    id: 10,
    city: "Казань",
    profession: "HR Generalist",
    position: "HR-специалист",
    franchise: "Франшиза №2",
    department: "HR-департамент",
  },
];

const mockFavorites = [1, 5, 7];

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
