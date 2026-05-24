import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import { StatusFilter } from "@/features/employee/ui/status-filter";
import { EmployeesList } from "@/widgets/employees-list";
import { CreateEmployeeWrapper } from "@/features/create-employee";
import { useState } from "react";
import type { TEmployeeStatus } from "@/entities/employee";

// TODO: заменить на реальные данные из API
const mockEmployees = [
  {
    id: 1,
    city: "Москва",
    linearManager: "Иванов Иван Иванович",
    name: "Иванова Татьяна Романовна",
    position: "Продуктовый менеджер",
    franchise: "Соц. Франшиза",
    department: "Отдел спецпроектов",
    status: "working" as const,
    photo: "/src/shared/assets/images/avatar-1.png",
    isArchived: false,
  },
  // ... остальные сотрудники
];

const mockVacancies = [
  // ... вакансии
];

const EmployeesPage = () => {
  const [statusFilterValue, setStatusFilterValue] = useState<TEmployeeStatus[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Книга сотрудников"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
      />
      <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
        <Navbar unitsList={orgTree} />
        <div>
          <div className="mb-4 flex justify-between items-center">
            <StatusFilter value={statusFilterValue} onValueChange={setStatusFilterValue} />
            <CreateEmployeeWrapper onSuccess={handleEmployeeCreated} />
          </div>
          <EmployeesList
            key={refreshKey}
            employees={mockEmployees}
            vacancies={mockVacancies}
            favoritesIds={[]}
          />
        </div>
      </div>
    </div>
  );
};

export const Component = EmployeesPage;